const fs = require("fs/promises");
const moment = require("moment"); 


const logError = async (controller, message, res) => { 
    try { 
        const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
        const path = "./logs/" + controller + ".txt"; 
        const logMessage = "[" + timestamp + "] " + message + "\n\n";
        await fs.appendFile(path, logMessage);
    } catch (error) { 
        console.error("Error writing log file: " + error);
    }
    res.status(500).send("Internal Server Error");
}

module.exports = { 
    logError, 
}; 

