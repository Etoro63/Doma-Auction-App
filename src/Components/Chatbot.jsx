import { useState } from "react";

// Simple Doma Auction FAQ for demo purposes
const domaAnswers = [
  {
    keywords: ["what", "doma"],
    answer: "Doma Auction is a decentralized platform for real estate auctions on Web3. Bid, win, and own property transparently and securely."
  },
  {
    keywords: ["how", "bid"],
    answer: "To bid, connect your wallet, browse live auctions, and place your bid. All bids are managed securely on-chain."
  },
  {
    keywords: ["wallet", "connect"],
    answer: "Doma Auction supports MetaMask, WalletConnect, Coinbase Wallet, and other EIP-1193 compatible wallets. Connect your wallet from the Dashboard page."
  },
  {
    keywords: ["secure", "transaction"],
    answer: "All property transfers and bids are secured by smart contracts, ensuring transparency and safety for every participant."
  },
  {
    keywords: ["support", "help", "contact"],
    answer: "For support, please use the chatbot or contact our team at support@doma-auction.app."
  },
  {
    keywords: ["feature", "auction"],
    answer: "Doma Auction offers decentralized property auctions, secure bidding, and transparent ownership transfer for buyers and sellers."
  }
];

function getDomaAnswer(input) {
  const lower = input.toLowerCase();
  for (const item of domaAnswers) {
    if (item.keywords.every(k => lower.includes(k))) return item.answer;
    if (item.keywords.some(k => lower.includes(k))) return item.answer;
  }
  // Default fallback
  if (lower.includes("doma")) {
    return "Doma Auction is a decentralized platform for secure, transparent real estate auctions on Web3.";
  }
  return "I'm here to help with anything about Doma Auction! Please ask your question.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, user: true }]);
    setInput("");

    setTimeout(() => {
      const answer = getDomaAnswer(input);
      setMessages((prev) => [
        ...prev,
        { text: answer, user: false }
      ]);
    }, 500);
  };

  return (
    <>
      {open && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <span>Doma Auction Bot</span>
            <button onClick={() => setOpen(false)} style={{background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#18182f'}}>✖</button>
          </div>
          <div
            className="chatbot-messages"
            style={{
              maxHeight: "320px",
              overflowY: "auto",
              paddingRight: "0.5rem",
              marginBottom: "0.5rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.user ? 'flex-end' : 'flex-start',
                  background: msg.user
                    ? 'linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)'
                    : 'rgba(24,24,47,0.7)',
                  color: msg.user ? '#18182f' : '#fff',
                  borderRadius: '1.1rem',
                  marginBottom: '0.5rem',
                  padding: '0.5rem 1rem',
                  maxWidth: '80%',
                  fontWeight: 500,
                  boxShadow: msg.user ? '0 2px 8px 0 rgba(167,139,250,0.10)' : 'none',
                  marginLeft: msg.user ? 'auto' : 0
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(true)}
        className="chatbot-toggle"
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chatbot"
      >
        💬
      </button>
    </>
  );
}