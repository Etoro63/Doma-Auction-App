
import React, { useState } from "react";

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  // const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // eslint-disable-next-line no-undef
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        // Get signer and contract

        // Example: Call a contract function (e.g., getBalance)
        // Replace 'getBalance' with your contract's function
        // const bal = await contract.getBalance(accounts[0]);
        // setBalance(bal.toString());
      } catch (error) {
        console.error(error);
        alert("Connection rejected.");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };
  return (
    <button
      className="bg-cyan-500 px-6 py-2 rounded-full hover:bg-cyan-600"
      onClick={connectWallet}
    >
      {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Connect Wallet"}
    </button>
  );
}
