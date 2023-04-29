import React, { useState } from 'react';
import './amount.css';
import Popup from 'reactjs-popup';
import Donation from '../../contracts/Donation.json';
import Web3 from 'web3';

function useDonation() {
  const [submit, setsubmit] = useState(false);
  const [error, seterror] = useState("Donation Successful");
  const [requestNo, setRequestNo] = useState(0);

  function handleSelect(e) {
    setRequestNo(parseInt(e.target.value));
  }

  async function donate(amount,requestNo) {
    const web3 = new Web3(Web3.givenProvider);
    const donationContract = new web3.eth.Contract(Donation.abi, Donation.networks[5777].address);
    const accounts = await web3.eth.getAccounts();
  
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 6385876; // Set the gas limit to a value suitable for your contract
    const tx = {
      from: accounts[0],
      to: donationContract.options.address,
      gasPrice: gasPrice,
      gas: gasLimit,
      value: web3.utils.toWei(amount.toString(), 'ether')
    };
    donationContract.methods.Donate(parseInt(requestNo), parseInt(amount)).send(tx).then((receipt) => {
      setsubmit(true);
      seterror("Donation Successful");
      console.log("Receipt",receipt)
      console.log("Request No is: ",requestNo)
    }).catch((error) => {
      setsubmit(true);
      seterror("Error occured while donating! Please try again!");
      console.log("error", error);
    });
  }

  return [submit, donate,setsubmit,error,handleSelect,requestNo];
}

function Amount() {
  const [amount, setAmount] = useState(0);
  const [submit, donate,setsubmit,error,handleSelect,requestNo] = useDonation();

  function handleChange(event) {
    const { value } = event.target;
    setAmount(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    donate(amount,requestNo);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="container">
        <input className="amount" type="number" placeholder="Amount" value={amount} name="value" onChange={handleChange} />
    
  <div className="menu">
    <button className="toggle" type="button">Donate for</button>
    <ul className="list">
    <li className="list-item" value="1" style={{ '--delay': '0.2s' }} onClick={handleSelect}>Schools</li>
  <li className="list-item" value="2" style={{ '--delay': '0.4s' }} onClick={handleSelect}>Single Moms</li>
  <li className="list-item" value="3" style={{ '--delay': '0.6s' }} onClick={handleSelect}>Oldage homes</li>
  <li className="list-item" value="4" style={{ '--delay': '0.8s' }} onClick={handleSelect}>Hospitals</li>

    </ul>
  </div>
</div>
      <Popup trigger=
                {<button className="btn-donate" type="submit" >Donate</button>}
                modal nested>
                {
                    close => (
                        submit && // Conditionally render Popup when submit is true
                        <div className='modal'>
                            <div className='content'>
                                {error}
                            </div>
                            <div>
                            <button className="btn-modal" onClick={() => {
                                close();
                                setsubmit(false);
                            }}>
                                X
                            </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            </form>
    </div>
  );
}

export default Amount;
