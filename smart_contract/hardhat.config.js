// require("@nomicfoundation/hardhat-toolbox");

// 测试网工具
require('@nomiclabs/hardhat-waffle');
// require('@nomiclabs/hardhat-ethers');

// https://eth-goerli.g.alchemy.com/v2/75F5_gX9AAMNly8IzPyKID7Mg2VGD_xP


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/75F5_gX9AAMNly8IzPyKID7Mg2VGD_xP',
      accounts: ['7fb73d1641edca42f3f6998e3295697999d28e6f287f0418578638c9283d3bbe']
    }
  }
};
