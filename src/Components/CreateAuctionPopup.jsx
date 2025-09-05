import React, { useState } from "react";
import '../index.css';

export default function CreateAuctionPopup({ show, onClose, onCreate }) {
  const [form, setForm] = useState({ title: '', startingBid: '', desc: '' });

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCreateAuction = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.startingBid.trim()) return;
    onCreate({ ...form });
    setForm({ title: '', startingBid: '', desc: '' });
    onClose();
  };

  if (!show) return null;
  return (
    <div className="popup-menu-backdrop" tabIndex={-1}>
      <div className="absolute inset-0" onClick={onClose}></div>
      <form 
        className="popup-menu show"
        onSubmit={handleCreateAuction}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
        autoComplete="off"
      >
        <button type="button" aria-label="Close" className="popup-menu-close" onClick={onClose}>&times;</button>
        <h2 className="popup-menu-title">Create Auction</h2>
        <div>
          <label className="popup-menu-label">Auction Title</label>
          <input name="title" value={form.title} onChange={handleFormChange} className="popup-menu-input" placeholder="e.g. My Auction" autoFocus />
        </div>
        <div>
          <label className="popup-menu-label">Starting Bid</label>
          <input name="startingBid" value={form.startingBid} onChange={handleFormChange} className="popup-menu-input" placeholder="e.g. 0.01 ETH" />
        </div>
        <div>
          <label className="popup-menu-label">Description</label>
          <textarea name="desc" value={form.desc} onChange={handleFormChange} className="popup-menu-textarea" placeholder="Describe your auction..." rows={2} />
        </div>
        <button type="submit" className="popup-menu-btn">Create Auction</button>
      </form>
    </div>
  );
}
