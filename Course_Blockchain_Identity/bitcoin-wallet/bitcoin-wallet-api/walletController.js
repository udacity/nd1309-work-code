
class WalletController {

    constructor(app) {
        this.app = app;
        this.getWalletInfo();
        this.getlistTransactions();
        this.signMessage();
    }

    getWalletInfo() {
        this.app.get("/api/getWalletInfo", (req, res) => {
            this.app.client.getWalletInfo().then((info) => {
                return res.status(200).json(info);
            }).catch((error) => { return res.status(500).send("Something went wrong trying to get wallet info.");})
        });
    }

    getlistTransactions() {
        this.app.get("/api/listtransactions", (req, res) => {
            this.app.client.listTransactions().then((transactions) => {
                return res.status(200).json(transactions);
            }).catch((error) => { return res.status(500).send("Something went wrong trying to get wallet info.");})
        });
    }

    signMessage() {
        this.app.post("/api/signmessage", (req, res) => {
            if(req.body.address) {
                let address = req.body.address;
                let message = req.body.message;
                if(address && message){
                    this.app.client.signMessage(address, message).then((signature) => {
                        return res.status(200).json(signature);
                    }).catch((error) => { return res.status(500).send("Something went wrong trying to get wallet info.");})
                } else {
                    return res.status(500).send("Check the Body Parameter!");
                }
            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
    }

}

module.exports = (app) => { return new WalletController(app);}