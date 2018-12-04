## How to run this application.

To be able to connect your application with your local Bitcoin Node you will need to install:

1. Bitcoin Core: https://bitcoin.org/en/download, You will need to download and install it.
2. Then you will use the following configuration for your bitcoin.conf file:
```

rpcuser=test
rpcpassword=Passw0rd!

server=1

testnet = 1

prune=550

```
This connect your bitcoin core to the testnet network and will use `prune` to save disk space. The rest of parameters allows you to serve your node as a server.

3. You will need to install bitcoin deamon: In this link you have the installations process: https://bitcoin.org/en/full-node#mac-os-x-yosemite-1010x
It is simple just use the curl url to download the executables.
4. You will need to start the deamon that will expose the rpc command: `bitcoind -testnet -daemon` and use the command `bitcoin-cli stop` to stop it.
5. Install all your project dependencies `npm install`.
6. Run your application using: `node app.js`