const { validate_token } = require("../controller/auth.controller.js"); 
const { getList } = require("../controller/config.controller.js"); 


const config = (app) => { 
    app.get("/api/config", validate_token(), getList); 
}; 

module.exports = { 
    config
}



