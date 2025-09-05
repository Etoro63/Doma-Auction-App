import { ethers } from "ethers";
import contractAbi from "../blockchain/contractAbi.json";

// Replace with your actual deployed contract address on Doma testnet
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // TODO: Replace with your real contract address

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signerOrProvider);
}