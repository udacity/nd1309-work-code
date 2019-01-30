pragma solidity >=0.4.24;

contract MainContract {

    uint internal value;

    constructor (uint amount) public {
        value = amount;
    }

    function deposit (uint amount) public {
        value += amount;
    }

    function withdraw (uint amount) public {
        value -= amount;
    }
}
