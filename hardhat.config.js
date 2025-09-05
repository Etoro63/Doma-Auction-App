require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    doma: {
      url: "https://rpc.testnet.doma.network", // Replace with actual Doma testnet RPC URL
  accounts: [process.env.DOMA_PRIVATE_KEY]
    }
  }
};
