/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain      |
|  ================================================ */

const SHA256 = require('crypto-js/sha256')
const LevelSandbox = require('./LevelSandbox.js')
const Block = require('./Block.js')

class Blockchain {
  constructor () {
    this.bd = new LevelSandbox.LevelSandbox()
    this.generateGenesisBlock()
  }

  // Create genesis block
  async generateGenesisBlock () {
    const height = await this.getBlockHeight()
    if (height < 0) {
      const genesisBlock = new Block.Block('Genesis Block')
      genesisBlock.time = new Date().getTime().toString().slice(0, -3);
      genesisBlock.hash = SHA256(JSON.stringify(genesisBlock)).toString();
      this.bd.addLevelDBData(genesisBlock.height, JSON.stringify(genesisBlock)).then(_ => console.log('Genesis block created'))
    } else {
      console.log('Genesis block exists already')
    }
  }

  /* Get the height of the BlockChain
  returns: Promise
  */
  async getBlockHeight () {
    const blocksCount = await this.bd.getBlocksCount() - 1;
    return blocksCount;
  }

  /* Add new block
  arg: Block
  returns: Promise
  */
  async addBlock (newBlock) {
    const height = await this.getBlockHeight()
    newBlock.height = height + 1
    newBlock.time = new Date().getTime().toString().slice(0, -3);
    if (newBlock.height > 0) {
      const previousBlock = await this.getBlock(height)
      newBlock.previousBlockHash = previousBlock.hash
    } else {
      // if no genesis block create one
      await this.generateGenesisBlock()
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    // Store block within levelDB
    return this.bd.addLevelDBData(newBlock.height, JSON.stringify(newBlock))
  }

  /* get block object from the blockchain
  arg: height integer
  returns: Promise
  */
  async getBlock (height) {
    return JSON.parse(await this.bd.getLevelDBData(height))
  }

  /* Validate block = check if a block has been tampered
  arg: height integer
  returns: Promise
  */
  async validateBlock (height) {
    const block = await this.getBlock(height)
    const blockHash = block.hash
    block.hash = ''
    const validBlockHash = hash(block)
    if (validBlockHash === blockHash) {
      return true
    } else {
      return false
    }
  }

  /* Validate link
  arg: height integer
  returns: Promise
  */
  async validateLink (height) {
    const block = await this.getBlock(height)
    const previousBlock = await this.getBlock(height - 1)
    return (block.previousBlockHash === previousBlock.hash)
  }

  // Validate Blockchain (chek if all blocks are valid)
  async validateChain () {
    const height = await this.getBlockHeight()
    const promisesArray = []
    // validate genesis block
    promisesArray.push(await this.validateBlock(0))
    // validate further blocks and their links
    for (let i = 1; i < height + 1; i++) {
      promisesArray.push(await this.validateBlock(i), await this.validateLink(i))
    }
    return Promise.all(promisesArray).then(valuesArray => {
      return !valuesArray.toString().includes('f')
    })
  }

  // Utility Method to Tamper a Block for Test Validation
  // This method is for testing purpose
  _modifyBlock (height, block) {
    let self = this
    return new Promise((resolve, reject) => {
      self.bd.addLevelDBData(height, JSON.stringify(block).toString())
        .then(blockModified => {
          resolve(blockModified)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}


// Hash data
function hash (objData) {
  return 
}

module.exports.Blockchain = Blockchain
