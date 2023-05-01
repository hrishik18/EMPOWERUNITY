import React, { useState,useEffect } from 'react';
import './amount.css';
import Popup from 'reactjs-popup';
import Donation from '../../contracts/Donation.json';
import Web3 from 'web3';

const web3_g = new Web3("http://localhost:7545");
//const value = web3_g.utils.toWei("0.01", "ether");
var g_accounts;
web3_g.eth.getAccounts().then((a) => {
  console.log(a);
  g_accounts = a;
}).catch((error) => {
  console.log(error);
});

function useDonation() {
  const [submit, setsubmit] = useState(false);
  const [error, seterror] = useState("Donation Successful");
  const [requestNo, setrequestNo] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [confirm, setconfirm] = useState(false)
  const [isConfirm, setisConfirm] = useState(false)


  useEffect(() => {
    switch (requestNo) {
      case 1:
        setRecipientAddress(g_accounts[1]); // replace with actual address for schools
        break;
      case 2:
        setRecipientAddress(g_accounts[2]); // replace with actual address for single moms
        break;
      case 3:
        setRecipientAddress(g_accounts[3]); // replace with actual address for old age homes
        break;
      case 4:
        setRecipientAddress(g_accounts[4]); // replace with actual address for hospitals
        break;
      default:
        setRecipientAddress(0);
        break;
    }
  }, [requestNo]);

  function handleSelect(e) {
    setrequestNo(parseInt(e.target.value));
}
  

  async function donate(amount, requestNo, recipientAddress) {
    setisConfirm(false);
    console.log("IS CONFIRM???",isConfirm)
    const web3 = new Web3(Web3.givenProvider);
    const donationContract = new web3.eth.Contract(
      Donation.abi,
      Donation.networks[5777].address
    );
    const accounts = await web3.eth.getAccounts();
    console.log("ADDRESS CHECK",accounts[5])
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 6385876; // Set the gas limit to a value suitable for your contract
    const tx = {
      from: accounts[0],
      to: donationContract.options.address,
      gasPrice: gasPrice,
      gas: gasLimit,
      value: web3.utils.toWei(amount.toString(), "ether"),
    };
  
    // Call the donate function on the donation contract with the recipient address and amount
    donationContract.methods
      .Donate(requestNo, web3.utils.toWei(amount.toString(), "ether"), recipientAddress)
      .send(tx)
      .then((receipt) => {
        setsubmit(true);
        seterror("Donation Successful");
        console.log("Receipt", receipt);
        console.log("Request No is: ", requestNo);
      })
      .catch((error) => {
        setsubmit(true);
        seterror("Error occurred while donating! Please try again!");
        console.log("error", error);
      });
    }
  return [submit,donate,setsubmit,error,handleSelect,requestNo,setRecipientAddress,recipientAddress,confirm,setconfirm,isConfirm, setisConfirm];
}

function Amount() {
  const [amount, setAmount] = useState(0);
  const [submit, donate,setsubmit,error,handleSelect,requestNo,setRecipientAddress,recipientAddress,confirm,setconfirm,isConfirm, setisConfirm] = useDonation();

  const request = {
    0:"",
    1: "Schools",
    2: "Single Moms",
    3: "Oldage homes",
    4: "Hospitals"
  };
  
  function handleChange(event) {
    const { value } = event.target;
    setAmount(value);
  }
  useEffect(() => {
    if (isConfirm) {
      donate(amount, requestNo, recipientAddress);
    }
  }, [isConfirm]);
  
  // function handleSubmit(event) {
  //   if(event)
  //   event.preventDefault();
  //   // setconfirm(false);
  //   if(isConfirm)
  //   donate(amount, requestNo, recipientAddress);
  // }

  return (
    <div>
      <div className="form">
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
  {<button className="btn-donate"  onMouseUp={() => {
    setconfirm(true)
  }}>Donate</button>}
  modal nested>
  {
    close => (
      <React.Fragment>
        {submit && (
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
        )}
        {confirm && (
          <div className='modal-confirm'>
            <div className='content-confirm'>
              Are you sure you want to donate {amount} ETH to {request[requestNo]}?
            </div>
            <div>
              <button className="btn-confirm" type="button" onClick={()  =>{
                 setconfirm(false);
                 setisConfirm(true);
              }}>
                YES I CONFIRM
              </button>
              <button className="btn-modal" type="button" onClick={() => {
                close();
                setconfirm(false);
              }}>
                X
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
</Popup>


            </div>
    </div>
  );
}

export default Amount;
