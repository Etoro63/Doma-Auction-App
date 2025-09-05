import React from 'react'

const About = () => {
  return (
    <div>
      <section className="about-section">
        <h1 className="about-title">About Doma Auction</h1>
        <p className="about-desc">
          Doma Auction is transforming real estate with decentralized, transparent, and secure property auctions on Web3. Bid, win, and own property with the power of blockchain.
        </p>
        <div className="about-cards-container" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2.5rem'}}>
          {/* Card 1 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(77,234,255,0.13)',
            border: '1.5px solid #4deaff33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>🏠</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#4deaff', marginBottom: '0.7rem'}}>Decentralized Auctions</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              All property auctions are powered by smart contracts, ensuring fairness, transparency, and security for every participant.
            </p>
          </div>
          {/* Card 2 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(167,139,250,0.13)',
            border: '1.5px solid #a78bfa33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>⚡</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#a78bfa', marginBottom: '0.7rem'}}>Fast & Global Bidding</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              Place bids from anywhere in the world, instantly. No intermediaries, no delays—just direct, secure participation.
            </p>
          </div>
          {/* Card 3 */}
          <div className="about-card" style={{
            background: 'rgba(35,35,68,0.92)',
            borderRadius: '1.2rem',
            boxShadow: '0 8px 32px 0 rgba(77,234,255,0.13)',
            border: '1.5px solid #4deaff33',
            padding: '2rem 1.5rem',
            maxWidth: 340,
            minWidth: 260,
            color: '#fff',
            flex: '1 1 260px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.2rem', marginBottom: '1rem'}}>🔗</div>
            <h2 style={{fontWeight: 700, fontSize: '1.3rem', color: '#4deaff', marginBottom: '0.7rem'}}>Transparent Ownership</h2>
            <p style={{color: '#cbd5e1', fontSize: '1.08rem'}}>
              Every transaction and property transfer is recorded on-chain, giving you full confidence in your new ownership.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About