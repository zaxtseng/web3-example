// require("@nomicfoundation/hardhat-toolbox");

// 测试网工具
require('@nomiclabs/hardhat-waffle');
// require('@nomiclabs/hardhat-ethers');

// https://eth-goerli.g.alchemy.com/v2/75F5_gX9AAMNly8IzPyKID7Mg2VGD_xP
const url = process.env.HARDHAT_URL;
const account = process.env.HARDHAT_ACCOUNT;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: url,
      accounts: [account]
    }
  }
};
