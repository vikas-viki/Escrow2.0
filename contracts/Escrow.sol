// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    // Seller of product.
    address public beneficiary;
    // Approvance of abiter if the sellor listed product is correct, and working correctly.
    bool public isApproved;
    // Title of product.
    string public title;
    // Description of product.
    string public description;
    // Amount for product in USD.
    uint256 public amountInUsd;
    // Image of product.
    string public image;
    // Address of buyer for the product.
    address public buyer;
    // Address of arbiter for the product.
    address public arbiter;
    // to show when it is created.
    uint256 public created;
    // to show the address of seller.
    string public _address;
    event Approved(uint256, address);

    AggregatorV3Interface internal priceFeed;

    // for checking if the product is bought or not.
    bool public bought;

    /*
        get the details of seller, title, description, image and the amount (in dollars) of product being sold.
    */
    constructor(
        string memory _title,
        string memory _description,
        uint256 _amountInUsd,
        string memory _image,
        address _creator,
        string memory _address_
    ) {
        beneficiary = _creator;
        title = _title;
        description = _description;
        amountInUsd = _amountInUsd;
        image = _image;
        created = block.timestamp;
        _address = _address_;
        // Create a new price feed for ETH/USD from chainlink oracle.
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    /*
    Get the details of buyer, and arbiter by buyer, because he want to verify from his side.
    Push the details to the respective arrays.
    */
    function buy(address _arbiter) public payable nonReentrant {
        require(_arbiter != address(0), "Arbiter cannot be null");
        require(bought == false, "The product already bought.");
        require(msg.sender != beneficiary, "Seller can't buy.");
        require(beneficiary != _arbiter, "Seller can't be a arbiter.");
        // Check if the buyer deposits enough amount of ethers to meet the sale requirenment.
        require(
            msg.value >= convertUSDToEther(int(amountInUsd)),
            "Insufficient token amount provided."
        );
        // Set respective buyer and seller.
        buyer = msg.sender;
        arbiter = _arbiter;
        bought = true;
    }

    /*
    Function for approver to approve if the product is good.
    */
    function approve(bool _good) external nonReentrant {
        require(bought == true, "Product not yet bought.");
        require(arbiter == msg.sender, "Only arbiter can approve.");
        uint256 balance = address(this).balance;
        // check if the product is good, if yes send amount to seller, if not send amount to buyer.
        if (_good == true) {
            (bool sent, ) = payable(beneficiary).call{value: balance}(
                "Your product sold."
            );
            require(sent, "Failed to send Ether");
            emit Approved(balance, msg.sender);
            isApproved = true;
        } else {
            (bool sent, ) = payable(buyer).call{value: balance}(
                "The product wasn't correct."
            );
            require(sent, "Failed to send Ether");
            isApproved = false;
        }
    }

    // get the equavalent amount of wei for dollars passed.
    function convertUSDToEther(
        int256 _usdAmount
    ) public view returns (uint256) {
        // Get the current ETH/USD price from Chainlink oracle.
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 etherPrice = uint256(price);

        // Calculate the equivalent amount of wei for the given USD amount.
        uint256 etherAmount = ((uint(_usdAmount) * (10 ** 8)) * 10 ** 18) /
            etherPrice;

        return etherAmount;
    }
}

contract EscrowFactory is ReentrancyGuard {
    // List of Escroww.
    Escrow[] public listings;
    uint256 public noOfListings;

    event newEscrow(
        address creator,
        string _title,
        string _description,
        uint256 _amountInUsd,
        string _image,
         string _address
    );

    function newListing(
        string memory _title,
        string memory _description,
        uint256 _amountInUsd,
        string memory _image,
        string memory _address
    ) public nonReentrant returns (address) {
        // Create new escrow using contracts.
        Escrow currentEscrow = new Escrow(
            _title,
            _description,
            _amountInUsd,
            _image,
            msg.sender,
            _address
        );
        // Add new escrow to list.
        listings.push(currentEscrow);
        // Increment the number of lisitngs.
        noOfListings++;

        emit newEscrow(msg.sender, _title, _description, _amountInUsd, _image, _address);
        // Return user the address of escrow for further communication.
        return address(listings[noOfListings - 1]);
    }

    function getListings() public view returns( Escrow[] memory){
        return listings;
    }
}
