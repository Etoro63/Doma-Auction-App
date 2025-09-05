const fs = require("fs");
const path = require("path");

const artifact = require("../artifacts/contracts/DomaAuction.sol/DomaAuction.json");
const abi = artifact.abi;

const targetPath = path.join(__dirname, "../src/blockchain/contractAbi.json");
fs.writeFileSync(targetPath, JSON.stringify(abi, null, 2));
console.log("ABI exported to src/blockchain/contractAbi.json");
