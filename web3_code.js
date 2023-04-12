// const Donate = artifacts.require("donate");

// module.exports = function (deployer) {
//     deployer.deploy(Donate);
// };


// const Web3 = require('web3');
// const abi = require('./build/contracts/Donation.json); // Replace with path to the ABI file
// const contractAddress = '<YOUR_CONTRACT_ADDRESS>'; // Replace with the contract address on your network

// // Connect to your Ethereum network
// const web3 = new Web3(new Web3.providers.HttpProvider('<YOUR_NETWORK_PROVIDER>'));

// // Create a new instance of the contract
// const donationContract = new web3.eth.Contract(abi, contractAddress);

// // Call the donate() function to send a donation
// const donationAmount = 0.1; // Replace with the amount you want to donate
// const donationOptions = {
//     from: '<YOUR_SENDER_ADDRESS>', // Replace with the sender address
//     value: web3.utils.toWei(donationAmount.toString(), 'ether')
// };
// donationContract.methods.donate().send(donationOptions, function (error, transactionHash) {
//     if (error) {
//         console.error('Error:', error);
//     } else {
//         console.log('Transaction hash:', transactionHash);
//     }
// });