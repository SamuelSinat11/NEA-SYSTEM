const { getList, register, login, profile, validate_token} = require("../controller/auth.controller.js");

const auth = (app) => { 
    app.get("/api/auth/get-list", getList); 
    app.post("/api/auth/register", register); 
    app.post("/api/auth/login", login); 
    app.get("/api/auth/profile", validate_token(), profile); 
}


module.exports = { auth };