
class BlockchainController {

    constructor(app) {
        this.app = app;
        this.getBlockchainInfo();
    }

    getBlockchainInfo() {
        this.app.get("/api/getBlockchainInfo", (req, res) => {
            this.app.client.getBlockchainInfo().then((info) => {
                return res.status(200).json(info);
            }).catch((error) => { return res.status(500).send("Something went wrong trying to get blockchain info.");})
        });
    }

}

module.exports = (app) => { return new BlockchainController(app);}