// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;


interface IERC20 {
    function transfer(address, uint) external returns (bool);
    function transferFrom(
        address,
        address,
        uint
    ) external returns (bool);
}


contract Donation {
    IERC20 public token;
    struct Request {
        uint32 id;
        address creator;
        uint32 startAt;
        uint totalAmount;
        string description;
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
   // make events for frontend - Donate,getbal,refund


    constructor()payable{
        org = payable(msg.sender);
        minAmount = 1000;
    }
    receive() external payable {
    }
    //Unix Timestamp - startTime
     //event MakeRequest(string _description, uint32 _startAt, uint32 _id);

    //making a request
    function makeRequest(string memory _description, uint32 _startAt, uint32 _id) public  {
        //require(_startAt >= block.timestamp,"Start time is less than current Block Timestamp");
        ReqCount += 1;
         requests[ReqCount] = Request({
            creator: msg.sender,
            id: _id,
            totalAmount: 0,
            startAt: _startAt,
            description: _description
        });
       // emit MakeRequest(ReqCount,msg.sender,_description,_startAt,_id);
    }
    //donation for single request
    function Donate(uint _requestNo)public payable{
        //require(msg.value>=minAmount,"Minimum Donation Amount not satisfied");
        Request storage req = requests[_requestNo];
        DonorAmount[_requestNo][msg.sender] += msg.value;
        req.totalAmount +=msg.value;
        totalDonationAmount += msg.value;
        DonationCount +=1;
        token.transferFrom(msg.sender, address(this), msg.value);
        //org.transfer(msg.value);
    }


    function getBalance() public view returns(uint){
         return address(this).balance;
    }


    function sendfund(address payable p,uint _amt)public payable {
        address payable pq = payable(address(p));
        token.transferFrom(org, pq, _amt);
    }
}
