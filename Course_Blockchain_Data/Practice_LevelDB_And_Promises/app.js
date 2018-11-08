//Importing levelSandbox class
const LevelSandboxClass = require('./levelSandbox.js');

// Creating the levelSandbox class object
const db = new LevelSandboxClass.LevelSandbox();

// Creating Data
(function theLoop (i) {
	setTimeout(function () {
		//Test Object
      	let objAux = {id: i, data: `Data #: ${i}`};
        db.addLevelDBData(i, JSON.stringify(objAux).toString()).then((result) => {
        	if(!result) {
              console.log("Error Adding data");
            }else {
              console.log(result);
            }
        }).catch((err) => { console.log(err); });
      	i++;
		if (i < 10) { 
          theLoop(i) 
        } else {
        	db.getBlocksCount().then((count) => {
	           console.log(`The id for your next object is: ${count}`);
            }).catch((err) => { console.log(err); });
        }
	}, 5600);
  })(0);

