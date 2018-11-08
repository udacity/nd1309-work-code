pragma solidity ^0.4.23;

contract HelloWorld { 
    string public message;
    
    constructor() public { 
        message = "Hello World!";
    }
    
    function getMessage() public view returns(string) { 
        return message;
    }
}