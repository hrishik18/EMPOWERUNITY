import React, { useState } from 'react';
import './amount.css';
import Donation from '../../contracts/Donation.json';
import Web3 from 'web3';

async function donate(amount) {
  const web3 = new Web3(Web3.givenProvider);
  const donationContract = new web3.eth.Contract(Donation.abi, Donation.networks[5777].address);
  const accounts = await web3.eth.getAccounts();
  const requestNo = 0; // Change this to the correct request number
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 6385876; // Set the gas limit to a value suitable for your contract
  const tx = {
    from: accounts[0],
    to: donationContract.options.address,
    gasPrice: gasPrice,
    gas: gasLimit,
    value: web3.utils.toWei(amount.toString(), 'ether')
  };
  // amount = web3.utils.toBN(amount);
  // console.log("Amount", amount);
  // console.log("type", typeof amount);
  donationContract.methods.Donate(requestNo, parseInt(amount)).send(tx).then((receipt) => {
    console.log("receipt", receipt);
  }).catch((error) => {
    console.log("error", error);
  });

  // donationContract.methods.Donate(requestNo, amount).send(tx, function (error, transactionHash) {
  //   if (error) {
  //     console.error('Error:', error);
  //   } else {
  //     console.log('Transaction hash:', transactionHash);
  //   }
  // });

  // donationContract.methods.msgVal()(tx, function (error, transactionHash) {
  //   if (error) {
  //     console.error('Error:', error);
  //   } else {
  //     console.log('Transaction hash:', transactionHash);
  //   }
  // });
}

function Amount() {
  const [amount, setAmount] = useState(0);

  function handleChange(event) {
    const { value } = event.target;
    setAmount(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    donate(amount);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} name="value" onChange={handleChange} />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default Amount;
