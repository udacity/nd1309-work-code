const SHA256 = require('crypto-js/sha256');

class BlockController {

    constructor(app) {
        this.app = app;
        this.getBlockHash();
    }

    
    getBlockHash() {
        this.app.post("/api/utilityblockhash", (req, res) => {
            if(req.body.height) {
                
                let hash = SHA256(JSON.stringify({height:req.body.height, body: req.body.body})).toString();
                return res.status(200).json(hash);

            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
    }
    

}

module.exports = (app) => { return new BlockController(app);}