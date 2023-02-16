import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constant';

const defaultValue = '';
type TransactionType = {
    connectWallet:()=>void;
    currentAccount: string;
}

export const TransactionContext = React.createContext('');

const { ethereum } = window as any;

const getEthereumContract = () => {
    // 目前ethers@6版本还是不稳定,暂时使用ethers@5版本和写法
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionsContract;
}

type FormDataType = {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
}
export const TransactionProvider = ({children}:{children:ReactNode}) => {
    const [currentAccount, setCurrentAccount] = useState<string>('');
    const [formData, setFormData] = useState<FormDataType>({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactionCount, setTransactionCount] = useState<number>(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e:ChangeEvent<HTMLInputElement>, name:string) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }))
    }
    // 获取所有转移交易
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask")
            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransactions();
            console.log('availableTransactions: ', availableTransactions);

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));

              setTransactions(structuredTransactions);

        } catch (error) {
            console.log('error: ', error);
            
        }
    }

    // 检查钱包是否链接
    const checkedIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask")
    
            const accounts = await ethereum.request({ method: 'eth_accounts'})
    
            if(accounts.length) {
                setCurrentAccount(accounts[0])
                
                getAllTransactions();
            }else{
                console.log('No account found')
                }
            
        } catch (error) {
            console.log('error', error);
            throw new Error("No ethereum object");
        }
    }

    // 链接钱包
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
            console.log('accounts: ', accounts[0]);
            
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log('error', error);
            throw new Error("No ethereum object");
        }
    }
    
    // 发送转账
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask')

            const { addressTo, amount, keyword, message } = formData;
            // 解析数值
            const parsedAmount = ethers.utils.parseEther(amount);
            // 转账合约
            const transactionsContract =  getEthereumContract();
            // 请求eth
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 数量级 21000 GWei
                    value: parsedAmount._hex
                }]
            })

            // 把交易合约放到区块链上,返回一个hash
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log('transactionHash.hash', transactionHash.hash);
            await transactionHash.wait();
            setIsLoading(false)
            console.log('transactionHash.hash', transactionHash.hash);

            const transactionCount = await transactionsContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber());

            window.reload();

        } catch (error) {
            console.log('error', error);
            throw new Error("No ethereum object");
        }
    }

    // 检查交易是否存在
    const checkIfTransactionsExist = async () => {
        try {
            // 交易合约和交易数量
            const transactionsContract =  getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionCount()
            // 存储交易数量到本地
            window.localStorage.setItem('transactionCount',transactionCount)
            
        } catch (error) {
            console.log('error', error);
            throw new Error("No ethereum object");
        }
    }


    useEffect(() => {
        // 初次挂载时检查
      checkedIfWalletIsConnected();
      checkIfTransactionsExist();
    }, [])
    

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange,sendTransaction,transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}