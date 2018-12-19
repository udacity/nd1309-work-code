
class BlockchainController {

    constructor(app) {
        this.app = app;
        this.getBlockchainInfo();
        this.getBlockchainBlocks();
        this.getTransactionInfo();
    }

    getBlockchainInfo() {
        this.app.get("/api/getBlockchainInfo", (req, res) => {
            this.app.client.getBlockchainInfo().then((info) => {
                return res.status(200).json(info);
            }).catch((error) => { return res.status(500).send("Something went wrong trying to get blockchain info.");})
        });
    }

    getBlockchainBlocks(){
        //Implement here
        this.app.get("/api/blocks", (req, res) => {
            this.app.client.getBlockCount().then((count) => {
                return new Promise((resolve, reject) => {
                    if(count){
                        resolve(count);
                    }
                    reject("Error counting Blocks");
                });
            }).then( async (blockCount) => {
                let hashes = [];
                await Promise.all([blockCount, blockCount - 1, blockCount -2, blockCount -3, blockCount-4].map( async (blockid) => {
                    let hash = await this.app.client.getBlockHash(blockid);
                    hashes.push(hash);
                }));
                return new Promise((resolve, reject) => {
                    resolve(hashes);
                });
            }).then( async (resHashes) => {
                let blocks = [];
                await Promise.all(resHashes.map( async (hash) => {
                    let block = await this.app.client.getBlock(hash);
                    blocks.push(block); 
                }));
                return new Promise((resolve, reject) => {
                    resolve(blocks);
                })
            }).then((blocks) => {
                return res.status(200).json(blocks);
            }).catch((error) => { res.status(500).send(error);})
        });
    }

    getTransactionInfo() {
        // Implement here
        this.app.get("/api/transactioninfo", (req, res) => {
            let txHash = req.query.tx;
            this.app.client.getRawTransaction(txHash).then((rawTransaction) => {
                return new Promise((resolve, reject) => {
                    if(rawTransaction){
                        resolve(rawTransaction);
                    }
                    reject("I couldn't get the raw transaction");
                });
            }).then((rawT) => {
                return this.app.client.decodeRawTransaction(rawT);
            }).then((decodedTransaction) => {
                if(decodedTransaction){
                    return res.status(200).json(decodedTransaction);
                } else {
                    return res.status(500).send("An error happen decoding the raw transaction");
                }
            }).catch((error) => {res.status(500).send(error);})
        });
    }

}

module.exports = (app) => { return new BlockchainController(app);}