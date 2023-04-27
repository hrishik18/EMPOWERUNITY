import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import classes from './topnav.module.css';

function TopNav() {
  const [web3, setWeb3] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3);
        const [address] = await web3.eth.getAccounts();
        setUserAddress(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Metamask not detected');
    }
  }

  useEffect(() => {
    connectToMetamask();
  }, []);

  function handleLogout() {
    setUserAddress(null);
    setWeb3(null);
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.name}>EmpowerUnity</div>
      <div className={classes.buttcontainer}>
        {userAddress ? (
          <div className={classes.box}>
            <button className={classes.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={classes.box}>
            <button className={classes.button} onClick={connectToMetamask}>
              Connect Metamask
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopNav;
