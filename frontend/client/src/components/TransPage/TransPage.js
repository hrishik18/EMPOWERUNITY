import './transpage.css';
import React, { useEffect, useState } from 'react';
import Donation from '../../contracts/Donation.json';
import Web3 from 'web3';

function TransPage(props) {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const web3 = new Web3(Web3.givenProvider);
  const request = {
    0:"Transaction Failed",
    1: "Schools",
    2: "Single Moms",
    3: "Oldage homes",
    4: "Hospitals"
  };
  

  useEffect(() => {
    async function loadTransactionHistory() {
      const accounts = await web3.eth.getAccounts();
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
    }
    loadTransactionHistory();
  }, []);
  const text="<b>Transaction Failed</b>";
  return (
    <div className="container">
<ul>
  {transactionHistory.slice(1).map((transaction) => (
    <li key={transaction.transactionHash}>
      <p>From: {transaction.returnValues[1] === "" ? transaction.donor : transaction.returnValues[1]}</p>
      <p>To: {transaction.returnValues.requestNo!=""?request[transaction.returnValues.requestNo]:text}</p>
      <p>Amount: {transaction.returnValues.amount} ETH</p>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TransPage;
