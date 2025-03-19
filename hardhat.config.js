require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337, // Default chainId for Hardhat network
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat network
    },
  },
};
