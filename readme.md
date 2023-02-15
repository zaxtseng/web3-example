# 项目初始化
新建文件夹client和smart_contract.

```bash
cd client
pnpm create vite ./ --template react-ts 
pnpm i
```
## 安装tailwindcss
```bash
pnpm add -D tailwindcss postcss autoprefixer
```
## 初始化tailwindcss
```bash
npx tailwindcss init -p
```
## 修改config文件
```cjs
// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## 添加tailwindcss到css文件
```css
/** index.css */ 
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## 复制logo和css
从`git@github.com:adrianhajdin/project_web3.0.git`复制images和index.css文件.

## 安装react-icons和ethers


## 添加更多的tailwindcss配置
从github上复制tailwindcss.config.cjs.

# 智能合约部分
进入smart_contract文件夹.
```bash
pnpm add @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle chai ethereum-waffle ethers hardhat ethers -D
```
## hardhat
安全帽,一个可以在本地测试智能合约的工具.
```bash
npx hardhat
```
选js模板,ts不一定有什么幺蛾子.
## 新建contracts/Transcations.sol文件
内部的写法有不少静态类型,类似ts.
功能主要是区块链的增加记录,转移记录,发起转移.

## 修改部署文件scripts/deploy.js

## 寻找测试币水龙头
由于Ropsten已经弃用,目前主要使用Goerli
## 注册alchemy
方便快速部署智能合约.在创建test Apps这里有get Test ETH.(也就是测试币).

## 配置hardhat.config.js
在alchemy上获取key.在view key那一项.

### 获取私钥
在mask上,账户详情.
## 执行部署
```bash
npx hardhat run scripts/deploy.js --network goerli
```
得到一个部署成功的链.(部署成功会扣除一点gas手续费).


将链地址复制,在client中创建`src/utils/constant.ts`.
将链地址保存导出.

这里编译出错,因为ethers的版本太高不兼容hardhat,需要移除ethers当前版本,安装5开头的.
```bash
pnpm add ethers@5.5.2 -D
```

## 文件复制
将部署生成的文件`artifacts/contracts/Transactions.json`复制到client文件夹的`utils`下.并且在constant文件中引入导出.
```ts
import abi from './Transactions.json';

export const contractABI = abi.abi;
```