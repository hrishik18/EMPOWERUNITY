// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <=0.8.19;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract Donation {
//     //is Context, ERC20 {
//     ERC20 public token;
//     struct Request {
//         uint32 id;
//         address creator;
//         uint32 startAt;
//         uint totalAmount;
//         string description;
//         //mapping(address => uint) Donoramount;
//         //mapping(address => uint) index;
//     }

//     uint public contractBalance;
//     uint public ReqCount;
//     uint public DonationCount;
//     mapping(uint => Request) public requests;
//     mapping(uint => mapping(address => uint)) public DonorAmount;
//     uint public totalDonationAmount;
//     uint public minAmount;
//     address payable public org;

//     event Deposited(uint amount);
//     event RequestCreated(
//         uint id,
//         address creator,
//         string description,
//         uint32 startAt
//     );
//     event Donated(uint requestNo, address donor, uint amount);
//     event FundSent(address recipient, uint amount);

//     constructor() {
//         //ERC20("NGO token", "NG") {
//         //_mint(_msgSender(), 10000 * (10 ** uint256(18)));
//         //_mint(msg.sender, 10000 * (10 ** uint256(8)));
//         // name = "ExtremeSetup Token";
//         // decimals = 16;
//         //totalsupply_ = 1000000 * 10 ** uint(decimals);
//         //balances[msg.sender] = _totalSupply;
//         //symbol = "NG";
//         //name = "NGO token";
//         org = payable(msg.sender);
//         minAmount = 1000;
//     }

//     receive() external payable {}

//     function getMsgValue() public payable returns (uint) {
//         return msg.value;
//     }

//     function deposit() public payable {
//         contractBalance += msg.value;
//         emit Deposited(msg.value);
//     }

//     function makeRequest(
//         string memory _description,
//         uint32 _startAt,
//         uint32 _id
//     ) public {
//         //require(_startAt >= block.timestamp,"Start time is less than current Block Timestamp");
//         ReqCount += 1;
//         requests[ReqCount] = Request({
//             creator: msg.sender,
//             id: _id,
//             totalAmount: 0,
//             startAt: _startAt,
//             description: _description
//         });
//         emit RequestCreated(ReqCount, msg.sender, _description, _startAt);
//     }

//     function Donate(uint _requestNo, uint _amt) public payable {
//         //payable(msg.sender).transfer(msg.value);
//         // require(_amt >= minAmount, "Minimum Donation Amount not satisfied");
//         Request storage req = requests[_requestNo];
//         DonorAmount[_requestNo][msg.sender] += _amt;
//         req.totalAmount += _amt;
//         totalDonationAmount += _amt;
//         DonationCount += 1;
//         //token.approve(msg.sender,  _amt)
//         //token.transferFrom(msg.sender, address(this), _amt);
//         org.transfer(_amt);
//         emit Donated(_requestNo, msg.sender, _amt);
//     }

//     function sendfund(address payable p) public payable {
//         //require(msg.sender == org, "the caller is not the owner");
//         //address payable pq = payable(address(p));
//         p.transfer(address(this).balance);
//         emit FundSent(p, address(this).balance);
//     }
// }

pragma solidity >=0.8.0 <=0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Donation is ERC20 {
    ERC20 public token;
    struct Request {
        uint32 id;
        address creator;
        uint32 startAt;
        uint totalAmount;
        string description;
        string title;
        address payable ToBePaid;
        uint maxAmount;
        //mapping(address => uint) Donoramount;
        //mapping(address => uint) index;
    }

    uint public ReqCount;
    uint public DonationCount;
    mapping(uint => Request) public requests;
    mapping(uint => mapping(address => uint)) public DonorAmount;
    uint public totalDonationAmount;
    uint public minAmount;
    address payable public org;

    event Deposited(uint amount);
    event RequestCreated(
        uint id,
        address creator,
        string description,
        string title,
        uint32 startAt
    );
    event Donated(uint requestNo, address donor, uint amount);
    event FundSent(address recipient, uint amount);

    constructor() payable ERC20("NGO token", "NG") {
        //token = IERC20(_token);
        _mint(msg.sender, 10000 * (10 ** uint256(18)));
        org = payable(msg.sender);
        minAmount = 1000;
    }

    receive() external payable {}

    function makeRequest(
        string memory _description,
        string memory _title,
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
            title: _title,
            ToBePaid: _p,
            maxAmount: _maxAmt
        });
        emit RequestCreated(
            ReqCount,
            msg.sender,
            _description,
            _title,
            _startAt
        );
    }

 function Donate(uint _requestNo, uint _amt, address payable recipientAddress) public payable {
    //payable(msg.sender).transfer(msg.value);
    //require(msg.value>=minAmount,"Minimum Donation Amount not satisfied");
    Request storage req = requests[_requestNo];
    DonorAmount[_requestNo][msg.sender] += msg.value;
    req.totalAmount += msg.value;
    totalDonationAmount += msg.value;
    DonationCount += 1;
    //token.approve(msg.sender, msg.value);
    //token.transferFrom(msg.sender, address(this), msg.value);
    recipientAddress.transfer(_amt);
    emit Donated(_requestNo, msg.sender, _amt);
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
        emit FundSent(req.ToBePaid, address(this).balance);
    }
}
