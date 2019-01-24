
const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('has correct name', () => {
    StarNotary.deployed().then((instance) => {
        return instance.starName.call();
    }).then((starName) => {
        assert.equal(starName, "Awesome Udacity Star");
    })
});

it('can be claimed', () => {
    let instance;
    StarNotary.deployed().then((instanceAux) => {
        instance = instanceAux;
        return instance.claimStar({from: owner});
    }).then((result) => {
        return instance.starOwner.call();
    }).then((starOwner) => {
        assert.equal(starOwner, owner)
    })
});

it('can change owners', async () => {
    let instance;
    let secondUser = accounts[1];
    StarNotary.deployed().then((instanceAux) => {
        instance = instanceAux;
        return instance.claimStar({from: owner})
    }).then((result) => {
        return instance.starOwner.call();
    }).then((starOwner) => {
        assert.equal(starOwner, owner);
        return instance.claimStar({from: secondUser});
    }).then((resultSec) => {
        return instance.starOwner.call();
    }).then((starOwnerSecond) => {
        assert.equal(starOwnerSecond, secondUser);
    })
 })

