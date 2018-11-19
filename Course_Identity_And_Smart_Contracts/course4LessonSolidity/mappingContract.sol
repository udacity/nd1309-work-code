pragma solidity ^0.4.25;

contract MappingContract {

    // Creates in Storage
    mapping(string => string) relations;

    // Add a relation

    function addRelation(string name, string relation) public {

        // Store the relation

        relations[name] = relation;
    }

    // Returns a Relation

    function getRelation(string name) public view returns (string){

        return relations[name];

    }

    // Remove the key value pair from the mapping

    function removeRelation(string name) public {
        delete(relations[name]);
    }
}
