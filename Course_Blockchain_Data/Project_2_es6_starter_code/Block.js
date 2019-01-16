/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
	constructor(data){
		// Add your Block properties
		// Example: this.hash = "";
		this.hash = "",
     	this.height = 0,
     	this.body = data,
     	this.time = 0,
     	this.previousBlockHash = ""
	}
}

module.exports.Block = Block;