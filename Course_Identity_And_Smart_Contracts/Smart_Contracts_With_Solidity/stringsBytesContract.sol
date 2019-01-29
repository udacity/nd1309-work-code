pragma solidity >=0.4.24;

contract StringBytes {
    // Static byte arrays, Both declarations will create array with 3 byte elements
    byte[3] fixedByteArray; // The type byte[] is an array of bytes, but due to padding rules, 
                            //it wastes 31 bytes of space for each element (except in storage). 
                            //It is better to use the bytes type instead.
    bytes3 bytes3Array;
    // Dynamic bytes arrays
    byte[] dynamicByteArray;
    bytes bytesArray;
    // String variable
    string    string1 = "testing";

    // Converts the bytes type to string type
    function conversionTest() public pure returns(string memory) {
        bytes   memory string2 = "Udacity"; // dynamic memory bytes type
        string  memory converted = string(string2);
        return converted;
    }

    // Retrieves the element at specified index
    // Cannot do with strings, hence converting to bytes
    function  getElementAt(uint index) public view returns(byte) {
        // Convert string to bytes
        bytes  memory bytesData = bytes(string1);
        // Get the element at the specified index
        byte   element = bytesData[index];
        return element;
    }

    function  testing() internal pure {
        // uint8 need to be explicitly converted to byte type
        // Converting to byte type, since fixedByteArray
        // is a byte type array
        // Assignment NOT allowed as bytes3 Array is a static Array
        // is readonly
        // bytes3Array[0] = 1;
        // Memory dynamic bytes Array
        bytes memory memoryBytes; // dynamic memory array
        memoryBytes = new bytes(20); //allocating memory
        memoryBytes[0] = "a";
        // Push will give compiler error as push() allowed for storage only
        //memoryBytes.push('c');
    }

    function stringExamples() public pure returns(string memory) {
        string memory string3 = "abcde";  // string array in memory
        return string3;
    }
}
