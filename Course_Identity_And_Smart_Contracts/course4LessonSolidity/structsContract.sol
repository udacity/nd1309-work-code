pragma solidity ^0.4.4;

contract StructsContract {


    // Country
    struct family {
        bytes32 lastName;
        uint8 houseNo;
        uint16  age;
    }

    // Creating an array of type family..which is a struct
    family []  myFamily;

    // Getting a lastName, and returning complete
    // family details
    // We cannot compare 2 strings in solidity...
    function getName(bytes32 name) public view returns (bytes32, uint8, uint16) {
        // Search the array

        for(uint8 i = 0; i < myFamily.length; i++){
            if(name == myFamily[i].lastName) {
                return (myFamily[i].lastName,uint8(myFamily[i].houseNo), myFamily[i].age);
            }
        }
    }

    // Structs Cannot be passed as argument so we are passing all elements/attributes of struct as args
    function addName(bytes32 _lastName, uint8 _value, uint16 _age) public returns (bool) {

        // Declare the struct variable in memory...
        family memory newFamily;

        //  use the . notation to access members of a struct
        newFamily.lastName = _lastName;
        newFamily.houseNo = _value;
        newFamily.age = _age;

        // Push the newFamily struct...into our myFamily array
       myFamily.push(newFamily);
        return true;
    }
}
