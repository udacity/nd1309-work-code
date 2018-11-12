pragma solidity ^0.4.25;

contract ModifiersContract {
    // State variable
    address owner;
    uint value;
    modifier ownerOnly {
        if(owner == msg.sender) {
            _;
        } else {
            revert();
        }
    }

    function anyoneCanCall () public returns (bool) {
        value = 100;
        return true;
    }

    function onlyOwnerCanCall () ownerOnly public returns (bool) {
        value = 100;
        return true;
    }
}
