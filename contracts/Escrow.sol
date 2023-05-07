// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Escrow {
    // Seller of product.
    address public beneficiary;
    // Approvance of abiter if the sellor listed product is correct, and working correctly.
    bool public isApproved;
    // Title of product.
    string public title;
    // Description of product.
    string public description;
    // Amount for product.
    uint256 public amount;
    // Image of product.
    string public image;
    // Address of buyer for the product.
    address public buyer;
    // Address of arbiter for the product.
    address public arbiter;
    // The number of decimal places for the price feed.
    uint8 private decimals;
    // The minimum amount of tokens required for a successful purchase.
    uint256 public minTokenAmount;

    event Approved(uint256);

    AggregatorV3Interface internal priceFeed;

    /*
    get the details of seller, and the product being sold.
    */
    constructor(
        string memory _title,
        string memory _description,
        uint256 _amount,
        string memory _image
    ) {
        beneficiary = msg.sender;
        title = _title;
        description = _description;
        amount = _amount;
        image = _image;
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        decimals = priceFeed.decimals();
        minTokenAmount = (amount * (10**decimals)) / getLatestPrice();
    }

    /*
    Get the details of buyer, and arbiter by buyer, because he want to verify from his side.
    Push the details to the respective arrays.
    */
    function buy(address _arbiter) public payable {
        uint256 tokenAmount = (msg.value * getLatestPrice()) / (10**decimals);
        require(
            tokenAmount >= minTokenAmount,
            "Insufficient token amount provided."
        );
        buyer = msg.sender;
        arbiter = _arbiter;
    }

    /*
    Function for approver to approve if the product is good.
    */
    function approve(bool _good) external {
        require(arbiter == msg.sender, "Only arbiter can approve.");
        uint256 balance = address(this).balance;
        if (_good == true) {
            (bool sent, ) = payable(beneficiary).call{value: balance}(
                "Your product sold."
            );
            require(sent, "Failed to send Ether");
            emit Approved(balance);
            isApproved = true;
        } else {
            (bool sent, ) = payable(buyer).call{value: balance}(
                "The product wasn't correct."
            );
            require(sent, "Failed to send Ether");
            isApproved = false;
        }
    }

    /*
    Get the latest ETH/USD price from Chainlink price feed.
    */
    function getLatestPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }
}
