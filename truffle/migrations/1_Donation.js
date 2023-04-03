const Donation = artifacts.require("Donation");

export default function (deployer) {
  deployer.deploy(Donation);
};
