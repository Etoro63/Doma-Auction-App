
import { useState } from "react";
import '../index.css';

function BidPopup({ open, auction, onClose, onConfirm }) {
  const [bidAmount, setBidAmount] = useState("");
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(24,24,47,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#232344", borderRadius: "1.2rem", padding: "2rem 2.5rem", boxShadow: "0 8px 32px 0 rgba(77,234,255,0.18)",
        minWidth: 320, maxWidth: "90vw", color: "#fff", textAlign: "center"
      }}>
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.7rem", color: "#4deaff" }}>
          Place Bid for {auction?.title}
        </h2>
        <p style={{ color: "#a78bfa", marginBottom: "1.2rem" }}>Current Highest Bid: {auction?.highestBid}</p>
        <input
          type="number"
          placeholder="Your bid (ETH)"
          value={bidAmount}
          onChange={e => setBidAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "0.7rem",
            borderRadius: "0.75rem",
            marginBottom: "1.2rem",
            fontWeight: 600,
            fontSize: "1.08rem"
          }}
        />
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => onConfirm(bidAmount)}
            style={{
              background: "linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)",
              color: "#18182f",
              fontWeight: 700,
              borderRadius: "9999px",
              padding: "0.7rem 2.2rem",
              fontSize: "1.08rem",
              boxShadow: "0 2px 12px 0 rgba(77,234,255,0.10)",
              border: "none",
              cursor: "pointer"
            }}
            disabled={!bidAmount}
          >
            Confirm Bid
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              color: "#a78bfa",
              fontWeight: 700,
              borderRadius: "9999px",
              padding: "0.7rem 2.2rem",
              fontSize: "1.08rem",
              border: "2px solid #a78bfa",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Plans() {
  const allAuctions = [
    { title: "Luxury Villa", highestBid: "2.5 ETH", endDate: "2025-09-10", image: "https://picsum.photos/seed/auction1/800/400" },
    { title: "Downtown Apartment", highestBid: "1.2 ETH", endDate: "2025-08-30", image: "https://picsum.photos/seed/auction2/800/400" },
    { title: "Beach House", highestBid: "3.1 ETH", endDate: "2025-09-15", image: "https://picsum.photos/seed/auction3/800/400" },
    { title: "Mountain Cabin", highestBid: "0.9 ETH", endDate: "2025-09-20", image: "https://picsum.photos/seed/auction4/800/400" },
    { title: "City Loft", highestBid: "1.7 ETH", endDate: "2025-09-25", image: "https://picsum.photos/seed/auction5/800/400" },
    { title: "Country Estate", highestBid: "2.9 ETH", endDate: "2025-09-30", image: "https://picsum.photos/seed/auction6/800/400" },
  ];
  const [search, setSearch] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Load More state
  const AUCTIONS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(AUCTIONS_PER_PAGE);

  const filteredAuctions = allAuctions.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );
  const visibleAuctions = filteredAuctions.slice(0, visibleCount);

  const handleBidClick = (auction) => {
    setSelectedAuction(auction);
    setPopupOpen(true);
  };

  const handleConfirmBid = (amount) => {
    setPopupOpen(false);
    setSuccessMsg(`Bid of ${amount} ETH placed for ${selectedAuction.title}!`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    // Add real bid logic here
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + AUCTIONS_PER_PAGE);
  };

  return (
    <section
      className="plans-section fade-in-up"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18182f 0%, #232344 100%)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Animated Background Blobs */}
      <div className="animated-bg-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="plans-header">
          <div>
            <h1 className="plans-title" style={{ letterSpacing: '-0.02em', fontWeight: 900, fontSize: '2.5rem', color: '#4deaff', textShadow: '0 4px 24px #4deaff22' }}>Live Property Auctions</h1>
            <p className="plans-desc" style={{ fontSize: '1.15rem', color: '#cbd5e1' }}>Bid on your dream property in real time, powered by Web3</p>
          </div>
          <div className="plans-filters">
            <input
              className="form-input pr-10"
              placeholder="Search auctions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: '200px', fontWeight: 600, borderRadius: '0.75rem' }}
            />
          </div>
        </div>

        <div className="plans-grid" style={{ maxHeight: '68vh', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
          {visibleAuctions.map((a, i) => (
            <div key={i} className="plans-card" style={{ transition: 'box-shadow 0.3s, transform 0.3s', boxShadow: '0 8px 32px 0 rgba(77,234,255,0.10), 0 1.5px 8px 0 rgba(178,89,255,0.10)', border: '1.5px solid rgba(168,139,250,0.13)', borderRadius: '1.1rem', background: 'linear-gradient(135deg, #232344 80%, #2e2e4d 100%)' }}>
              <img className="plan-card-image w-full" src={a.image} alt="" style={{ borderTopLeftRadius: '1.1rem', borderTopRightRadius: '1.1rem', height: '160px', objectFit: 'cover' }} />
              <div className="p-6">
                <h3 className="plans-card-title flex items-center gap-2" style={{ fontWeight: 700, color: '#4deaff', fontSize: '1.18rem' }}>
                  {a.title}
                </h3>
                <p className="plans-card-price" style={{ color: '#a78bfa', fontSize: '1.08rem', marginBottom: '1.2rem' }}>Highest Bid: {a.highestBid}</p>
                <p style={{ color: '#cbd5e1', fontSize: '1.02rem', marginBottom: '1.2rem' }}>Ends: {a.endDate}</p>
                <button
                  className="plans-card-btn mt-2"
                  style={{ fontWeight: 700, borderRadius: '9999px', boxShadow: '0 2px 12px 0 rgba(77,234,255,0.10)', fontSize: '1.08rem', background: 'linear-gradient(90deg, #a78bfa 0%, #4deaff 100%)', color: '#18182f', padding: '0.7rem 0', width: '100%', transition: 'background 0.3s, color 0.3s, transform 0.2s' }}
                  onClick={() => handleBidClick(a)}
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          {visibleCount < filteredAuctions.length && (
            <button
              className="plans-load-btn"
              style={{ fontWeight: 700, borderRadius: '9999px', padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <BidPopup
        open={popupOpen}
        auction={selectedAuction}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirmBid}
      />
      {showSuccess && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(24,24,47,0.75)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#232344", borderRadius: "1.2rem", padding: "2rem 2.5rem", color: "#4deaff", fontWeight: 700, fontSize: "1.2rem"
          }}>
            {successMsg}
          </div>
        </div>
      )}
    </section>
  );
}

