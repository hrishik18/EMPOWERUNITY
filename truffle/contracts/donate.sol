// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.4.22 <0.9.0;


// // ERC20 interface

// import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
// // Ownable contract
// import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";



contract Donation {
    address payable public organization =payable(0x55B3be802eA82c20A506430c8942693A3660234B); // Address of the organization receiving donations
    uint public donationAmount; // Amount to be donated

    constructor( uint _donationAmount) {
        donationAmount = _donationAmount;
    }

    function donate() public payable {
        require(msg.value == donationAmount, "Donation amount must match specified amount");
        organization.transfer(msg.value);
    }
}