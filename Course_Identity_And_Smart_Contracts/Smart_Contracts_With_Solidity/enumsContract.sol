pragma solidity >=0.4.24;

contract EnumsContract {

    // Create an Enumeration
    enum names {Joe, Brandy, Rachna, Jessica}

    // get the value at specified index
    function getNames(uint8 arg) public pure returns (string memory){
        if(arg == uint8(names.Joe)) return "Joe";
        if(arg == uint8(names.Brandy)) return "Brandy";
        if(arg == uint8(names.Rachna)) return "Rachna";
        if(arg == uint8(names.Jessica)) return "Jessica";
    }
}
