/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock(){
        // Add your code here
        this.getBlockHeight().then((height) => {
            if (height == 0) {
                let genesisBlock = new Block.Block("First block in the chain - Genesis Block");
                this.addBlock(genesisBlock);
            }
        }).catch((err) => {
            console.log("Error in generateGenesisBlock", err);
        });
    }

    // Get block height, it is a helper method that return the height of the blockchain
    getBlockHeight() {
        // Add your code here
        creturn new Promise((resolve, reject) => {
            this.db.getBlocksCount().then((height) => {
                resolve(height);
            }).catch((err) => {
                console.log("Error in getBlockHeight", err);
                reject(err);
            });
        }).catch((err) => {
            console.log("Error in getBlockHeight", err);
            reject(err);
        });
    }

    // Add new block
    addBlock(block) {
        // Add your code here
        return new Promise((resolve, reject) => {
            // Block height from levelDB
            this.getBlockHeight().then((height) => {
                newBlock.height = height;
                // UTC timestamp
                newBlock.timeStamp = new Date().getTime().toString().slice(0,-3);
                if (newBlock.height > 0) {
                    // previous block hash
                    this.getBlock(newBlock.height - 1).then((previousBlock) => {
                        newBlock.previousBlockHash = previousBlock.hash;
                        // SHA256 requires a string of data
                        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                        // add block to chain
                        resolve(this.db.addDataToLevelDB(JSON.stringify(newBlock).toString()));
                    }).catch((err) => {
                        console.log("Error in addBlock in getLevelDBData", err);
                        reject(err);
                    });
                } else {
                    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                    resolve(this.db.addDataToLevelDB(JSON.stringify(newBlock).toString()));
                }
            }).catch((err) => {
                console.log("Error in addBlock in getBlockHeight", err);
                reject(err);
            });
        }).catch((err) => {
            console.log("Error in addBlock in Promise", err);
        });
    }

    // Get Block By Height
    getBlock(height) {
        // Add your code here
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.getLevelDBData(height).then((block_string) => {
                resolve(JSON.parse(block_string));
            }).catch((err) => { reject(err) });
        });
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
        let self = this;
        return new Promise((resolve, reject) => {
            self.getBlock(height).then((target_block) => {
                let origin_hash = target_block.hash;
                target_block.hash = "";
                let new_hash = SHA256(JSON.stringify(target_block)).toString();
                if (origin_hash === new_hash) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => reject(err));
        });
    }

        // Make sure the link(hash) to the previous block is valid.
    validateLink(height) {
        let self = this;
        if (height === 0) {
            return self.validateBlock(0);
        } else {
            return new Promise((resolve, reject) => {
                self.getBlock(height).then((this_block) => {
                    self.getBlock(height - 1).then((last_block) => {
                        if (last_block.hash === this_block.previousBlockHash) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }).catch((err) => reject(err));
                }).catch((err) => reject(err));
            });
        }
    }

    // Validate Blockchain
    async validateChain() {
        let self = this;
        let block_validation = [];
        let link_validation = [];
        let err_log = new Set();

        try {
            // Push all the validation works into two Promise arrays.
            await self.getBlockHeight().then((block_height) => {
                console.log("Blocks to be validated: " + (block_height + 1));
                for (let height = 0; height <= block_height; height++) {
                    block_validation.push(self.validateBlock(height));
                    link_validation.push(self.validateLink(height));
                }
            });

            // First check if the block is valid.
            await Promise.all(block_validation).then((block_result) => {
                for (let i = 0; i < block_result.length; i++) {
                    if (block_result[i] === false) {
                        err_log.add(i);
                    }
                }
            });

            // Then check the links.
            await Promise.all(link_validation).then((link_result) => {
                for (let i = 0; i < link_result.length; i++) {
                    if (link_result[i] === false) {
                        err_log.add(i);
                    }
                }
            });

        } catch (err) {
            console.log(err);
        }
        return err_log;
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
   
}

module.exports.Blockchain = Blockchain;
