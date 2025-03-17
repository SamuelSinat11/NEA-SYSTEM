const { register, login, profile, validate_token} = require("../controller/auth.controller.js");

const auth = (app) => { 
    app.post("/api/auth/register", register); 
    app.post("/api/auth/login", login); 
    app.get("/api/auth/profile", validate_token(), profile); 
}


module.exports = { auth };