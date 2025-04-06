require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load .env file

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || process.env.INFURA_API_URL,
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
    }
  },
};
