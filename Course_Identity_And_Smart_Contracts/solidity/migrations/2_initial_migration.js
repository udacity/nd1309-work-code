var BasicDataType = artifacts.require("BasicDataType");
var TypesConversion = artifacts.require("TypesConversion");
var ArraysContract = artifacts.require("ArraysContract");
var StringBytes = artifacts.require("StringBytes");
var MappingsContract = artifacts.require("MappingsContract");
var EnumsContract = artifacts.require("EnumsContract");
var StructsContract = artifacts.require("StructsContract");
var GlobalVariables = artifacts.require("GlobalVariables");
var FunctionsContract = artifacts.require("FunctionsContract");
var ExceptionsContract = artifacts.require("ExceptionsContract");
var MainContract = artifacts.require("MainContract");
var InheritanceContract = artifacts.require("InheritanceContract");
var EventsContract = artifacts.require("EventsContract");

module.exports = function(deployer) {
    deployer.deploy(BasicDataType);
    deployer.deploy(TypesConversion);
    deployer.deploy(ArraysContract);
    deployer.deploy(StringBytes);
    deployer.deploy(MappingsContract);
    deployer.deploy(EnumsContract);
    deployer.deploy(StructsContract);
    deployer.deploy(GlobalVariables);
    deployer.deploy(FunctionsContract, "Test", 28);
    deployer.deploy(ExceptionsContract);
    deployer.deploy(MainContract, 100);
    deployer.deploy(InheritanceContract, "Test");
    deployer.deploy(EventsContract);
};