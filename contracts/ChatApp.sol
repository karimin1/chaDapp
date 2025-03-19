//SPDX-license-Identifier:MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
contract ChatApp{
struct user{
string name;
freind [] freindList;
} 
struct freind{
address pubkey;
string name;
}
struct allUserStruck{
    string name;
    address accountsAddress;
}
allUserStruck [] getAllUsers;
struct message{
    address   sender;
    uint256 time;
    string  msg;
}
mapping(address=>user) userList;
mapping(bytes32=>message[]) allMessage;

function checkIfUserExist(address pubkey)public view returns(bool){
    return  bytes(userList[pubkey].name).length>0;
}
function createAccount(string calldata name)external{
require(checkIfUserExist(msg.sender)==false,'user already exist');
require (bytes(name).length>0,'username cannot be empty');
userList[msg.sender].name=name;
getAllUsers.push(allUserStruck(name,msg.sender) );
}
function getUserName(address pubkey)external view returns(string memory){
    require(checkIfUserExist(pubkey),'user is not  register');
    return userList[pubkey].name;

}
function addfreinds(address freind_key,string calldata name)external {
    require(checkIfUserExist(msg.sender),'Create an account first');
    require(checkIfUserExist(freind_key),'User is not registered');
    require(bytes(name).length>0);
    require(msg.sender!=freind_key,'user can not  add him self');
    require(checkAlreadyFreinds(msg.sender,freind_key)==false,'already exist as freind');
    _addfreinds(msg.sender,freind_key,name);
    _addfreinds(freind_key,msg.sender,userList[msg.sender].name);

}
//check already freinds
function checkAlreadyFreinds(address pubkey1,address pubkey2)internal view   returns(bool){

    if(userList[pubkey1].freindList.length>userList[pubkey2].freindList.length){
        address tmp=pubkey1;
        pubkey1=pubkey2;
        pubkey2=tmp;
    }
        for (uint256 i=0;i<userList[pubkey1].freindList.length;i++){
        if(userList[pubkey1].freindList[i].pubkey==pubkey2)return true;
        }
        return false;
}
    function _addfreinds(address me,address freind_key,string memory name)internal{
        freind memory newfreind= freind(freind_key,name);
        userList[me].freindList.push(newfreind);
    }
   function getMyFreindList()external view returns(freind[] memory){
    return   userList[msg.sender].freindList;
   }
   function _getChatCode(address pubkey1,address pubkey2)internal pure returns(bytes32){
    if(pubkey1<pubkey2){
        return keccak256(abi.encodePacked(pubkey1,pubkey2));
    }else return keccak256(abi.encodePacked(pubkey2,pubkey1));

   }
   function sendMessage(address freind_key,string calldata _msg)external {
    require(checkIfUserExist(msg.sender),'you should create an account');
    require(checkIfUserExist(freind_key),'user not register');
    require(checkAlreadyFreinds(msg.sender,freind_key),'not a freind');
    bytes32 chatCode=_getChatCode(msg.sender,freind_key);
    message memory chat_msg=message(msg.sender,block.timestamp,_msg);
    allMessage[chatCode].push(chat_msg);
   }
   function readMessage(address freind_key)external view  returns(message[] memory ){
    bytes32  msg_chat=_getChatCode(msg.sender,freind_key);
    return allMessage[msg_chat];
   }
    function getAllUserApp()public view  returns(allUserStruck[] memory){
        return getAllUsers;
    }
 }
