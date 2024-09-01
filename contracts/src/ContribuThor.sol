// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

/// @title ContribuThor
/// @notice A contract for receiving and tracking payments for web pages
contract ContribuThor {
    // Minimum payment amount required
    uint256 public constant MINIMUM_AMOUNT = 0.001 ether;
    // Address of the contract owner
    address public owner;

    // Mapping to track total payments for each page URL
    mapping(string pageUrl => uint256 totalAmount) public urlAmounts;

    // Event emitted when a payment is received
    event PaymentReceived(
        address indexed payer,
        uint256 amount,
        string pageUrl
    );
    // Event emitted when funds are withdrawn by the owner
    event Withdrawal(address indexed owner, uint256 amount);

    /// @notice Sets the contract deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    /// @notice Allows users to make payments for a specific page URL
    /// @param pageUrl The URL of the page being paid for
    function pay(string memory pageUrl) external payable {
        require(msg.value >= MINIMUM_AMOUNT, "Payment amount too low");

        urlAmounts[pageUrl] += msg.value;
        emit PaymentReceived(msg.sender, msg.value, pageUrl);
    }

    /// @notice Allows the owner to withdraw all funds from the contract
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");

        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        emit Withdrawal(owner, balance);
    }

    /// @notice Fallback function to handle direct payments
    receive() external payable {
        revert("Use the pay function to make payments");
    }

    /// @notice Fallback function to handle calls to undefined functions
    fallback() external payable {
        revert("Use the pay function to make payments");
    }
}
