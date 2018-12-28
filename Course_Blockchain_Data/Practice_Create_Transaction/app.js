const ClientCore = require('bitcoin-core');

const client = new ClientCore({ network: 'testnet', port: 18332, password: 'Passw0rd!', username: 'test' });

// Verify that we are connected to the network
/*
client.getBalance().then((balance) => {
    console.log(balance);
}).catch((error) => { console.log(error);});
*/

// Check UTXOs
/*
client.listUnspent().then((result) => {
    console.log(result);
}).catch((error) => { console.log(error);});
*/

// Get UTXOs detail
/*
client.getTxOut("c08e7a30d8da1486ccdc8951cb719c7a172f5d2deebcac8a0e342f3afedfb5e8", 1).then((result) => {
    console.log(result);
}).catch((error) => { console.log(error);});
*/

// Creation of the Raw Transaction
/*
client.createRawTransaction([{"txid":"c08e7a30d8da1486ccdc8951cb719c7a172f5d2deebcac8a0e342f3afedfb5e8", "vout": 1}], {"mybW92mvenayt92rdkrckruq8NHFG641Ud":0.05, "2N4bt9g15H2AbUqdWrtyKvdu6xK9hj63qRA":0.068}).then((rawTransaction) => {
    console.log(rawTransaction);
}).catch((error) => { console.log(error);});
*/

// Raw Transaction
//0200000001e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000000ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288acc00477000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f8700000000

// Decode command
/*
client.decodeRawTransaction("0200000001e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000000ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288ac80c267000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f8700000000").then((decodedRawTransaction) => {
    console.log(decodedRawTransaction);
}).catch((error) => { console.log(error);});
*/

// Sign Raw Transaction
/*
const batch = [
    { method: 'signrawtransactionwithwallet', parameters: ["0200000001e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000000ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288ac80c267000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f8700000000"] }
];

client.command(batch).then(([signedRawTransaction]) => {
    console.log(signedRawTransaction);
}).catch((error) => { console.log(error);});
*/

//02000000000101e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000017160014e7e26839423bf8684074bc6063df25f4b5457ee8ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288ac80c267000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f870247304402202af8b39afb7ff1dd849e40bb4cc25bb07d49d79169e1aca7251b6310be5364ac02204bff162b6914af63a0da4dbc3fb2580c8fa02318dbfee2888f00d83189bf01b2012102cb9af10cdf97c357ef6857fbab9ef502f5c15cde80d9047744fda3ee40cd00b500000000


// Decode Sign Raw Transaction command
/*
client.decodeRawTransaction("02000000000101e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000017160014e7e26839423bf8684074bc6063df25f4b5457ee8ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288ac80c267000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f870247304402202af8b39afb7ff1dd849e40bb4cc25bb07d49d79169e1aca7251b6310be5364ac02204bff162b6914af63a0da4dbc3fb2580c8fa02318dbfee2888f00d83189bf01b2012102cb9af10cdf97c357ef6857fbab9ef502f5c15cde80d9047744fda3ee40cd00b500000000").then((decodedRawTransaction) => {
    console.log(decodedRawTransaction);
}).catch((error) => { console.log(error);});
*/
/*

//Sending Signed Raw Transaction to the network
client.sendRawTransaction("02000000000101e8b5dffe3a2f340e8aacbcee2d5d2f177a9c71cb5189dccc8614dad8307a8ec00100000017160014e7e26839423bf8684074bc6063df25f4b5457ee8ffffffff02404b4c00000000001976a914c64e82a680d870cf272f162a503086bdbe86133288ac80c267000000000017a9147c918f0d23e052c1a5a8cedbbd7cd5663343fc9f870247304402202af8b39afb7ff1dd849e40bb4cc25bb07d49d79169e1aca7251b6310be5364ac02204bff162b6914af63a0da4dbc3fb2580c8fa02318dbfee2888f00d83189bf01b2012102cb9af10cdf97c357ef6857fbab9ef502f5c15cde80d9047744fda3ee40cd00b500000000").then((result) => {
    console.log(result);
}).catch((error) => { console.log(error);});

*/

// Checking if the transaction went correctly

/*
client.getTransaction("5cb26bcbe86e63b7f85b416a33cd10d102bbd0e0b8661532ced52f46d6effb88").then((result) => {
    console.log(result);
}).catch((error) => { console.log(error);});
*/

