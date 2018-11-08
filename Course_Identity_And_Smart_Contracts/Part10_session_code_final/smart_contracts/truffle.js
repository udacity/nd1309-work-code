var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "illegal crater ask whisper surround quick desk broccoli sniff frozen upset hockey";

module.exports = {
  networks: { 
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/7fe5bc645210410cac5e983d0b4795fa') 
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 2
    }
  }
};
