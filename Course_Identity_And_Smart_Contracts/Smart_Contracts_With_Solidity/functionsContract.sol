pragma solidity ^0.4.25;

contract Funcs {

  string  ownerName;
  uint8   ownerAge;

  // Constructor
  constructor (string name, uint8 age) public {
    ownerName = name;
    ownerAge = age;
  }

  // We are changing the owner name and age
  function  setOwnerInfo(string name, uint8 age) public {
    ownerName = name;
    ownerAge = age;
  }

  function secretFunction() private pure {
    // Not available outside this contract
  }
// Get owner name and age
  function  getOwnerInfo() public view returns (string name, uint8 age){
    name = ownerName;
    age = ownerAge;
  }

// Get the name
// 2 ways to return values from a function
  function  getOwnerName() public view returns (string) {
    return ownerName;
  }

  // Get the age
  function  getOwnerAge() public view returns(uint8 age){
    age = ownerAge;
    //return ownerAge;
  }
}
