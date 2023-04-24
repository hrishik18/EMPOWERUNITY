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
  };
  await donationContract.methods.Donate(requestNo, amount).send(tx);
}

function Amount() {
  const [amount, setAmount] = useState(0);

  function handleChange(event) {
    const { value } =  event.target;
    setAmount(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(amount);
    donate(amount);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} onChange={handleChange} />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default Amount;
