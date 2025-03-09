const { getAll, getOne, create, update, remove, login, validate_token } = require("../controller/users.controller.js");


const users = (app) => { 
    app.get("/api/users", validate_token(), getAll);
    app.post("/api/users/login", validate_token(), login); 
    app.get("/api/users/:id",validate_token(), getOne);
    app.post("/api/users/create",validate_token(), create);
    app.put("/api/users/update",validate_token(), update);
    app.delete("/api/users/delete/:id",validate_token(), remove);
}; 

module.exports = { 
    users, 
}; 

