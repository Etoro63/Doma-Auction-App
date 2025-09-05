import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// Example SVG icons (you can use image URLs or official logos)
const okxIcon = `<svg width="32" height="32" viewBox="0 0 32 32"><circle fill="#000" cx="16" cy="16" r="16"/><text x="16" y="21" text-anchor="middle" fill="#fff" font-size="14" font-family="Arial">OKX</text></svg>`;
const suiIcon = `<svg width="32" height="32" viewBox="0 0 32 32"><circle fill="#00e1e1" cx="16" cy="16" r="16"/><text x="16" y="21" text-anchor="middle" fill="#fff" font-size="14" font-family="Arial">SUI</text></svg>`;
const sonicIcon = `<svg width="32" height="32" viewBox="0 0 32 32"><circle fill="#6c47ff" cx="16" cy="16" r="16"/><text x="16" y="21" text-anchor="middle" fill="#fff" font-size="14" font-family="Arial">SONIC</text></svg>`;

// Custom injected wallet configs with icon
const customInjected = (name, check, icon) => ({
  display: {
    name,
    description: `Connect with ${name} browser extension`,
    icon: icon,
  },
  package: null,
  connector: async () => {
    if (check()) {
      return window.ethereum;
    }
    throw new Error(`${name} extension not found`);
  }
});

export async function connectWallet(setWalletAddress) {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {
      injected: {
        display: {
          name: "MetaMask / Injected",
          description: "Connect with browser wallet extension"
        },
        package: null
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
        }
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "PulsePay",
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          rpc: "",
          chainId: 1,
          darkMode: true
        }
      },
      okxwallet: customInjected(
        "OKX Wallet",
        () => window.okxwallet || (window.ethereum && window.ethereum.isOkxWallet),
        okxIcon
      ),
      suiwallet: customInjected(
        "Sui Wallet",
        () => window.suiWallet || (window.ethereum && window.ethereum.isSuiWallet),
        suiIcon
      ),
      sonicwallet: customInjected(
        "Sonic Wallet",
        () => window.sonicWallet || (window.ethereum && window.ethereum.isSonicWallet),
        sonicIcon
      ),
    }
  });

  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    localStorage.setItem("pulsepay_wallet", address);
    return address;
  } catch (err) {
    console.error("Wallet connection failed", err);
    return null;
  }
}