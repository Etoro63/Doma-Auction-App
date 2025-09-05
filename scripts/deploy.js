// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const DomaAuction = await ethers.getContractFactory("DomaAuction");
  const contract = await DomaAuction.deploy();
  await contract.deployed();
  console.log("DomaAuction deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
