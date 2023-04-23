import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import contract from '../../truffle/build/contracts/Donation.json';
//import contract.json 

function App() {
  const [web3, setweb3] = useState(null);
  const [accounts, setaccounts] = useState(null);
  const [contract, setcontract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const value = web3.utils.toWei("0.01", "ether");
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = contract.networks[networkId];
      // const contract = new web3.eth.Contract(
      //   contract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );
      setweb3(web3);
      setaccounts(accounts);
      setcontract(contract);

    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      await contract.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
      const balance = await contract.methods.getBalance().call();
      console.log(balance);
      this.setState = { balance: balance };
    }
    if (typeof web3 !== undefined && typeof accounts !== undefined && typeof contract !== undefined) {
      load();
    }
  }, [web3, contract, accounts]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;


// window.addEventListener('load', async () => {
//   if (typeof window.ethereum !== 'undefined') {
//     await window.ethereum.enable();
//     const web3 = new Web3(window.ethereum);
//     console.log(await web3.eth.getAccounts());
//   } else {
//     console.error('No web3 provider detected');
//   }
// });