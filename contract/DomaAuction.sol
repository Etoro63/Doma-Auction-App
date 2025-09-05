// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DomaAuction {
    struct Auction {
        address seller;
        string domain;
        uint256 startingPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool ended;
    }

    uint256 public feeRate = 100; // 1% fee (in basis points: 100 = 1%)
    address public owner;
    uint256 public auctionCount;
    uint256 public totalRevenue; // Track revenue earned
    mapping(uint256 => Auction) public auctions;

    event AuctionCreated(uint256 indexed auctionId, string domain, uint256 startingPrice, uint256 duration, address seller);
    event BidPlaced(uint256 indexed auctionId, uint256 amount, address bidder);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Create a new auction
    function createAuction(string memory _domain, uint256 _startingPrice, uint256 _duration) external {
        require(_startingPrice > 0, "Starting price must be > 0");
        require(_duration > 0, "Duration must be > 0");

        auctionCount++;
        auctions[auctionCount] = Auction({
            seller: msg.sender,
            domain: _domain,
            startingPrice: _startingPrice,
            highestBid: 0,
            highestBidder: address(0),
            endTime: block.timestamp + _duration,
            ended: false
        });

        emit AuctionCreated(auctionCount, _domain, _startingPrice, _duration, msg.sender);
    }

    // Place a bid
    function placeBid(uint256 _auctionId) external payable {
        Auction storage auction = auctions[_auctionId];
        require(block.timestamp < auction.endTime, "Auction ended");
        require(!auction.ended, "Auction already closed");

        uint256 minBid = auction.highestBid == 0 ? auction.startingPrice : auction.highestBid + 1;
        require(msg.value >= minBid, "Bid too low");

        // Refund previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;

        emit BidPlaced(_auctionId, msg.value, msg.sender);
    }

    // End auction & transfer funds
    function endAuction(uint256 _auctionId) external {
        Auction storage auction = auctions[_auctionId];
        require(block.timestamp >= auction.endTime, "Auction still active");
        require(!auction.ended, "Auction already ended");

        auction.ended = true;

        if (auction.highestBid > 0) {
            uint256 fee = (auction.highestBid * feeRate) / 10000; // 1%
            uint256 payout = auction.highestBid - fee;
            totalRevenue += fee;

            payable(auction.seller).transfer(payout);
            payable(owner).transfer(fee);

            emit AuctionEnded(_auctionId, auction.highestBidder, auction.highestBid);
        }
    }

    // Owner can update fee
    function setFeeRate(uint256 _feeRate) external {
        require(msg.sender == owner, "Only owner");
        require(_feeRate <= 1000, "Fee too high"); // Max 10%
        feeRate = _feeRate;
    }
}
