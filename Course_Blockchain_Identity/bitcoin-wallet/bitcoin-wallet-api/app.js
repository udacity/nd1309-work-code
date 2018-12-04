const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Client = require('bitcoin-core');

class ApplicationServer {

	constructor() {
        this.app = express();
        this.app.client = new Client({ network: 'testnet', port: 18332, password: 'Passw0rd!', username: 'test' });
		this.initExpress();
		this.initExpressMiddleWare();
		this.initControllers();
		this.start();
	}

	initExpress() {
		this.app.set("port", 8000);
	}

	initExpressMiddleWare() {
		this.app.use(morgan("dev"));
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());
		this.app.use(cors());
	}

	initControllers() {
        require("./walletController.js")(this.app);
		require("./blockchainController.js")(this.app);
		require("./blockController.js")(this.app);
	}

	start() {
		let self = this;
		this.app.listen(this.app.get("port"), () => {
			console.log(`Server Listening for port: ${self.app.get("port")}`);
		});
	}

}

new ApplicationServer();