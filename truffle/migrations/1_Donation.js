const Donation = artifacts.require("Donation");

module.exports = async function (deployer) {
  //deployer.deploy(Donation);
  const inst = await Donation.deployed();
  const result = await inst.getBalance();
  console.log(result.toNumber());
};
