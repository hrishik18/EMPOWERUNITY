const Donation = artifacts.require("Donation");
const ERC20 = artifacts.require("@openzeppelin/contracts/token/ERC20/utils/ERC20.sol");



module.exports = async function (deployer) {
  const value = web3.utils.toWei("3", "ether");
  const instance = await deployer.deploy(Donation, { value });   //, { value }
  const token = await deployer.deploy(ERC20, "NGO Token", "NG");
  const accounts = await web3.eth.getAccounts();

  web3.eth.getAccounts()
    .then(accounts => {
      console.log(accounts);
    })
    .catch(error => {
      console.log(error);
    });

  //could mint here 


  //console.log(`Contract deployed at address ${instance.address} with ${web3.utils.fromWei(value)} ether sent.`);
  // const inst = await Donation.deployed();
  // const result = await inst.getBalance();
  // console.log(result.toNumber());
};


//'0xacCC3628E92D60E1a181f159e8a98EB92A922922' - contract address 
//npm install --save-dev @openzeppelin/contracts-upgradeable @nomiclabs/hardhat-ethers @openzeppelin/hardhat-upgrades dotenv

