const { getList, register, login, profile, validate_token} = require("../controller/auth.controller.js");

const auth = (app) => { 
    app.get("/api/auth/get-list", validate_token(), getList); 
    app.post("/api/auth/register", register); 
    app.post("/api/auth/login", login); 
    app.get("/api/auth/profile",profile); 
}


module.exports = { auth };