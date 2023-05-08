require('@nomicfoundation/hardhat-toolbox');
const dotenv = require('dotenv').config();
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.APIKEY, // the URL of your node
      chainId: 11155111, // the ID of your network
      // Seller, Buyer & Arbiter
      accounts: [process.env.SELLER, process.env.BUYER, process.env.ARBITER], // an array of private keys of accounts to use on this network
    },
  },
};
