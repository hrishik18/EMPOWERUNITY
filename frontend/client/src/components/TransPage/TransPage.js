import './transpage.css'
import React, { useEffect, useState } from 'react';
import Donation from '../../contracts/Donation.json';
import Web3 from 'web3';

function TransPage(props) {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const web3 = new Web3(Web3.givenProvider);
  const donationContract = new web3.eth.Contract(
    Donation.abi,
    Donation.networks[5777].address
  );
  const accounts = web3.eth.getAccounts();

  useEffect(() => {
    const address = accounts[0];
    const donationContract = new web3.eth.Contract(
      Donation.abi,
      Donation.networks[5777].address
    );

    donationContract.getPastEvents('allEvents', {
      filter: {from: address},
      fromBlock: 0,
      toBlock: 'latest'
    }).then((events) => {
      // Convert the transaction amount from wei to ether
      const eventsInEther = events.map((event) => {
        const amountInWei = new web3.utils.BN(event.returnValues.amount);
        const amountInEther = web3.utils.fromWei(amountInWei.toString(), 'ether');
        return {...event, returnValues: {...event.returnValues, amount: amountInEther}};
      });
      setTransactionHistory(eventsInEther);
    });
  }, []);

  return (
    <div className="container">
      <ul>
        {transactionHistory.map((transaction) => (
          <li key={transaction.transactionHash}>
            <p>From: {transaction.returnValues.from}</p>
            <p>To: {transaction.returnValues.to}</p>
            <p>Amount: {transaction.returnValues.amount} ETH</p>
            <p>Timestamp: {transaction.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransPage;
