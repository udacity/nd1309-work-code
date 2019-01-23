pragma solidity ^0.4.25;

contract GlobalsContract {

    string  public lastCaller = "not-set";


    // Demonstrates the use of the ether subdenominations
    function  etherUnitsTest() public pure returns(bool) {
        // True
        bool value = (1 ether == 1000 finney);
        return value;
    }

    // Demonstrates the use of the time units
    function  timeUnits() public view returns (uint) {
        uint  timeNow = now;   //storing current time using now
        //returns block time in seconds since 1970
        if (timeNow == 1000 days) { // converting 1000 literal to days, using the suffix days
            return timeNow;
        }
    }

    // Demonstrates the use of block object
    function  getBlockInformation() public view returns (uint number, bytes32 hash, address coinbase, uint difficulty) {
        number = block.number; // Previous block
        hash = blockhash(number - 1); // -1 because excluding current...same as block.blockhash()
        // Current block
        coinbase = block.coinbase;
        difficulty = block.difficulty;
    }

    // Demonstrates the use of the msg object
    function getMsgInformation() public view returns (bytes data, bytes4 sig, address sender) {
        data = msg.data;
        sig = msg.sig;
        sender = msg.sender;
    }

}
