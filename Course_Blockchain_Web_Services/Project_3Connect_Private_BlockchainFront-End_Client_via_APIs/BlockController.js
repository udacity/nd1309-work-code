const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const LevelSandbox = require('./LevelSandbox.js');
const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');
/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize all your endpoints here
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
        this.db = new LevelSandbox.LevelSandbox();
        this.blockChain = new BlockChain.Blockchain();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        let self = this;

        self.app.get("/block/:index", (req, res) => {
            // Add your code here
            let key = req.params.index
            // console.log(req.params.index)
            self.blockChain.getBlock(key).then((block) => {
                res.json(block)
            }).catch((err) => {
                res.json(`${err} (${key})!`)
            });
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            // Add your code here
            if (req.body) {
                console.log(req.body);
                let newBlock = new Block.Block(req.body);
                console.log(newBlock);
                return this.blockChain.addBlock(newBlock).then((result) => {
                    console.log(result);
                    return ( `Data received,  ${req.body}`)
                }).catch((err) => {
                    console.log(err);
                    res.JSON(`Adding block failed ${err}`);
                });
            } else {
                res.JSON(' Make sure to write data');
            }
        })
    }

    /**
     * Helper method to initialize a Mock dataset. It adds 10 test blocks to the blocks array.
     */
    initializeMockData() {
        if (this.blocks.length === 0) {
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app); }