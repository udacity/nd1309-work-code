/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key, function (err, value) {
                if (err) {
                    reject('Error!');
                    console.log(`${key} Error !`, err);

                }
                resolve(value, 'GET successed !!');
            });

        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(key, JSON.stringify(value), function (success, err) {
                if (err) {
                    console.log('Error with Put!', err);
                    reject(`(${key},${value}) Error with Put!`);
                }
                resolve(` ${JSON.stringify(value)}`);
            });
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        const dataArray = [];
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.createReadStream()
                .on('data', function (data) {
                    dataArray.push(data);
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                    resolve(dataArray.length);
                });
        });
    }

    addDataToLevelDB(data) {
        let self = this;
        let i = 0;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.createReadStream()
                .on('data', function (data) {
                    i++;
                })
                .on('error', function (err) {
                    console.log('Failed to read stream!', err)
                    reject(`Error addDataToLevelDB  !! ${data}`);
                })
                .on('close', function () {
                    // console.log(`Adding Block....${i}`, data);
                    self.addLevelDBData(i, data).then((result) => {
                        resolve(result)
                    }).catch((err) => {
                        console.log(`${err} try`)
                    });
        });
    });
}

getBlock(height) {
    let self = this;
    return new Promise(function (resolve, reject) {
        self.getLevelDBData(height)
            .then((result) => {
                resolve(result);
            });
    });
}


}


module.exports.LevelSandbox = LevelSandbox;
