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

const isEmptyOrNull = (value) => { 
    if (value === "" || value === null || value === undefined) {
        return true; 
    }
    return false;
};


const validate_token = () => {
    return (req, res, next) => {
        const authorization = req.headers.authorization; // Token from client
        let token_from_client = null;

        if (authorization && authorization.startsWith("Bearer ")) {
            token_from_client = authorization.split(" ")[1]; // Extract token after "Bearer "
        }

        if (!token_from_client) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        jwt.verify(token_from_client, Config.ACCESS_TOKEN_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Unauthorized", error });
            }
            
            req.user = decoded.data;
            req.user_id = decoded.data.Id;
            next();
        });
    };
};

module.exports = { 
    logError, 
    isEmptyOrNull, 
    validate_token
}; 

