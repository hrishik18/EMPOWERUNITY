// const { expect } = require("chai");
// const { BN, constants, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
// const ERC20 = artifacts.require("SafeERC20");
// const Donation = artifacts.require("Donation");

// contract("Donation", accounts => {
//     const [owner, donor1, donor2] = accounts;

//     beforeEach(async function () {
//         this.token = await ERC20.new("Token", "TKN", 18);
//         this.contract = await Donation.new({ from: owner });
//         await this.token.transfer(donor1, web3.utils.toWei("10", "ether"));
//         await this.token.transfer(donor2, web3.utils.toWei("10", "ether"));
//     });

//     describe("Donation Contract", function () {

//         it("should have the correct org", async function () {
//             expect(await this.contract.org()).to.equal(owner);
//         });

//         it("should have the correct minimum donation amount", async function () {
//             expect(await this.contract.minAmount()).to.be.bignumber.equal(web3.utils.toWei("0.001", "ether"));
//         });

//         it("should make a request correctly", async function () {
//             await this.contract.makeRequest("Test Description", 1234, 1, { from: owner });
//             const request = await this.contract.requests(1);
//             expect(request.id).to.be.bignumber.equal(new BN(1));
//             expect(request.creator).to.equal(owner);
//             expect(request.totalAmount).to.be.bignumber.equal(new BN(0));
//             expect(request.startAt).to.be.bignumber.equal(new BN(1234));
//             expect(request.description).to.equal("Test Description");
//         });

//         it("should accept donations correctly", async function () {
//             const requestNo = 1;
//             const donationAmount = web3.utils.toWei("1", "ether");
//             await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
//             await this.contract.Donate(requestNo, { from: donor1, value: donationAmount });
//             const request = await this.contract.requests(requestNo);
//             expect(request.totalAmount).to.be.bignumber.equal(new BN(donationAmount));
//         });

//         it("should not accept donations below the minimum amount", async function () {
//             const requestNo = 1;
//             const donationAmount = web3.utils.toWei("0.0001", "ether");
//             await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
//             await expectRevert(
//                 this.contract.Donate(requestNo, { from: donor1, value: donationAmount }),
//                 "Minimum Donation Amount not satisfied"
//             );
//             const request = await this.contract.requests(requestNo);
//             expect(request.totalAmount).to.be.bignumber.equal(new BN(0));
//         });

//         it("should not accept donations for non-existent requests", async function () {
//             const requestNo = 999;
//             const donationAmount = web3.utils.toWei("1", "ether");
//             await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
//             await expectRevert(
//                 this.contract.Donate(requestNo, { from: donor1, value: donationAmount }),
//                 "revert"
//             );
//         });

//         it("should allow org to make a request", async () => {
//             const description = "Test request";
//             const startAt = Math.floor(Date.now() / 1000) + 3600; // Start in 1 hour
//             const id = 1;
//             await donationContract.makeRequest(description, startAt, id, { from: org });
//             const request = await donationContract.requests(id);
//             assert.equal(request.creator, org);
//             assert.equal(request.description, description);
//             assert.equal(request.startAt, startAt);
//             assert.equal(request.totalAmount, 0);
//         });

//         it("should allow user1 to donate to a request", async () => {
//             const requestId = 1;
//             const amount = web3.utils.toWei("1", "ether");
//             const tokenAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual token address
//             const token = await IERC20.at(tokenAddress); // Get the token instance
//             await token.approve(donationContract.address, amount, { from: user1 }); // Approve the token transfer
//             await donationContract.Donate(requestId, { from: user1, value: amount }); // Donate to the request
//             const request = await donationContract.requests(requestId);
//             const donorAmount = await donationContract.DonorAmount(requestId, user1);
//             assert.equal(request.totalAmount, amount);
//             assert.equal(donorAmount, amount);
//         });

//         it("should allow user2 to donate to a request", async () => {
//             const requestId = 1;
//             const amount = web3.utils.toWei("0.5", "ether");
//             const tokenAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual token address
//             const token = await IERC20.at(tokenAddress); // Get the token instance
//             await token.approve(donationContract.address, amount, { from: user2 }); // Approve the token transfer
//             await donationContract.Donate(requestId, { from: user2, value: amount }); // Donate to the request
//             const request = await donationContract.requests(requestId);
//             const donorAmount = await donationContract.DonorAmount(requestId, user2);
//             assert.equal(request.totalAmount, web3.utils.toWei("1.5", "ether"));
//             assert.equal(donorAmount, amount);
//         });

//         it("should allow org to withdraw funds", async () => {
//             const initialBalance = web3.utils.toBN(await web3.eth.getBalance(org));
//             const contractBalance = web3.utils.toBN(await donationContract.getBalance());
//             await donationContract.sendfund(org, { from: org });
//             const finalBalance = web3.utils.toBN(await web3.eth.getBalance(org));
//             assert.ok(finalBalance.sub(initialBalance).gte(contractBalance));
//         });
//     });

// });


const { expect } = require("chai");
const Donation = artifacts.require("Donation");
const ERC20 = artifacts.require("@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol");
console.log(ERC20);
contract("Donation", accounts => {

    console.log(accounts);
    let token;
    const owner = accounts[0];
    const org = accounts[0];
    const donor1 = accounts[1];
    const donor2 = accounts[2];

    beforeEach(async () => {
        //     console.log(token).toString();
        this.token = await ERC20.new();
        this.contract = await Donation.new();
        //     await this.token.safeTransfer(donor1, web3.utils.toWei("10", "ether"), {
        //         from: owner,
        //     });
        //     await this.token.safeTransfer(donor2, web3.utils.toWei("10", "ether"), {
        //         from: owner,
        //     });
    });

    contract("Donation Contract", function () {
        it("should have deployed", async () => {
            donate_inst = await Donation.deployed();
            expect(donate_inst.address).to.not.equal(null);
        });
        it("should put 10000 in the first account", async () => {
            const balance = await donate_inst.getBalance(accounts[0]);
            console.log(balance.valueOf());
            assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
        });
        /**it("should receive and transfer tokens", async () => {
            const amount = web3.utils.toWei("1", "ether");
            console.log(this.contract.address);
            await this.token.transfer(this.contract.address, amount);
            await this.contract.Donate(0, amount);
            const contractBalance = await this.token.balanceOf(this.contract.address);
            expect(contractBalance).to.equal(amount);
            const donorBalance = await this.token.balanceOf(donor1);
            expect(donorBalance).to.equal(web3.utils.toWei("99", "ether"));
        });

        it("should have the correct org", async function () {
            expect(await this.contract.org()).to.equal(owner);
        });

        it("should have the correct minimum donation amount", async function () {
            expect(await this.contract.minAmount()).to.be.bignumber.equal(web3.utils.toWei("0.001", "ether"));
        });

        it("should make a request correctly", async function () {
            await this.contract.makeRequest("Test Description", 1234, 1, { from: owner });
            const request = await this.contract.requests(1);
            expect(request.id).to.be.bignumber.equal(new BN(1));
            expect(request.creator).to.equal(owner);
            expect(request.totalAmount).to.be.bignumber.equal(new BN(0));
            expect(request.startAt).to.be.bignumber.equal(new BN(1234));
            expect(request.description).to.equal("Test Description");
        });

        it("should accept donations correctly", async function () {
            const requestNo = 1;
            const donationAmount = web3.utils.toWei("1", "ether");
            await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
            await this.contract.Donate(requestNo, { from: donor1, value: donationAmount });
            const request = await this.contract.requests(requestNo);
            expect(request.totalAmount).to.be.bignumber.equal(new BN(donationAmount));
        });

        it("should not accept donations below the minimum amount", async function () {
            const requestNo = 1;
            const donationAmount = web3.utils.toWei("0.0001", "ether");
            await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
            await expectRevert(
                this.contract.Donate(requestNo, { from: donor1, value: donationAmount }),
                "Minimum Donation Amount not satisfied"
            );
            const request = await this.contract.requests(requestNo);
            expect(request.totalAmount).to.be.bignumber.equal(new BN(0));
        });

        it("should not accept donations for non-existent requests", async function () {
            const requestNo = 999;
            const donationAmount = web3.utils.toWei("1", "ether");
            await this.token.approve(this.contract.address, donationAmount, { from: donor1 });
            await expectRevert(
                this.contract.Donate(requestNo, { from: donor1, value: donationAmount }),
                "revert"
            );
        });

        it("should allow org to make a request", async () => {
            const description = "Test request";
            const startAt = Math.floor(Date.now() / 1000) + 3600; // Start in 1 hour
            const id = 1;
            await donationContract.makeRequest(description, startAt, id, { from: org });
            const request = await donationContract.requests(id);
            assert.equal(request.creator, org);
            assert.equal(request.description, description);
            assert.equal(request.startAt, startAt);
            assert.equal(request.totalAmount, 0);
        });

        it("should allow user1 to donate to a request", async () => {
            const requestId = 1;
            const amount = web3.utils.toWei("1", "ether");
            const tokenAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual token address
            const token = await IERC20.at(tokenAddress); // Get the token instance
            await token.approve(donationContract.address, amount, { from: user1 }); // Approve the token transfer
            await donationContract.Donate(requestId, { from: user1, value: amount }); // Donate to the request
            const request = await donationContract.requests(requestId);
            const donorAmount = await donationContract.DonorAmount(requestId, user1);
            assert.equal(request.totalAmount, amount);
            assert.equal(donorAmount, amount);
        });

        it("should allow user2 to donate to a request", async () => {
            const requestId = 1;
            const amount = web3.utils.toWei("0.5", "ether");
            const tokenAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual token address
            const token = await IERC20.at(tokenAddress); // Get the token instance
            await token.approve(donationContract.address, amount, { from: user2 }); // Approve the token transfer
            await donationContract.Donate(requestId, { from: user2, value: amount }); // Donate to the request
            const request = await donationContract.requests(requestId);
            const donorAmount = await donationContract.DonorAmount(requestId, user2);
            assert.equal(request.totalAmount, web3.utils.toWei("1.5", "ether"));
            assert.equal(donorAmount, amount);
        });

        it("should allow org to withdraw funds", async () => {
            const initialBalance = web3.utils.toBN(await web3.eth.getBalance(org));
            const contractBalance = web3.utils.toBN(await donationContract.getBalance());
            await donationContract.sendfund(org, { from: org });
            const finalBalance = web3.utils.toBN(await web3.eth.getBalance(org));
            assert.ok(finalBalance.sub(initialBalance).gte(contractBalance));
        });*/
    })
});
