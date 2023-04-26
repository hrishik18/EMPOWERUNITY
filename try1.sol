// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Donation {
    IERC20 public token;
    address creator;
    uint32 startAt;
    uint totalAmount;
    string description;
    address payable ToBePaid;
    uint maxAmount;
    //mapping(address => uint) Donoramount;
    //mapping(address => uint) index;

    uint public ReqCount;
    uint public DonationCount;
    mapping(uint => Request) public requests;
    mapping(uint => mapping(address => uint)) public DonorAmount;
    uint public totalDonationAmount;
    uint public minAmount;
    address payable public org;

    // make events for frontend - Donate,getbal,refund

    constructor() payable {
        //token = IERC20(_token);
        org = payable(msg.sender);
        minAmount = 1000;
    }

    receive() external payable {}

    function makeRequest(
        string memory _description,
        uint32 _startAt,
        uint32 _id,
        address payable _p,
        uint _maxAmt
    ) public {
        //only org can make req add line
        //require(_startAt >= block.timestamp,"Start time is less than current Block Timestamp");
        ReqCount += 1;
        requests[ReqCount] = Request({
            creator: msg.sender,
            id: _id,
            totalAmount: 0,
            startAt: _startAt,
            description: _description,
            ToBePaid: _p,
            maxAmount: _maxAmt
        });
        // emit MakeRequest(ReqCount,msg.sender,_description,_startAt,_id);
    }

    function Donate(uint _requestNo, uint _amt) public payable {
        //payable(msg.sender).transfer(msg.value);
        //require(msg.value>=minAmount,"Minimum Donation Amount not satisfied");
        Request storage req = requests[_requestNo];
        DonorAmount[_requestNo][msg.sender] += _amt;
        req.totalAmount += _amt;
        totalDonationAmount += _amt;
        DonationCount += 1;
        token.transferFrom(msg.sender, address(this), _amt);
        //org.transfer(msg.value);
    }

    function transferERC20(address to, uint256 amount) public {
        require(msg.sender == org, "Only owner can withdraw funds");
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        //emit TransferSent(msg. sender, to, amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function msgVal() public payable returns (uint) {
        return msg.value;
    }

    function sendfund(uint _amt, uint _requestNo) public payable {
        //only org can make the payment to
        Request storage req = requests[_requestNo];
        //address payable pq = payable(address(p));  address payable p
        token.transferFrom(org, req.ToBePaid, _amt);
    }
}
