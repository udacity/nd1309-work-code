pragma solidity ^0.4.21;

contract constructorContract {
    uint public amount;

    constructor (uint value) public {
        amount = value;
    }
}
