const { getAll, getOne, create, update, remove, login } = require("../controller/users.controller.js");

const users = (app) => { 
    app.get("/api/users", getAll);
    app.post("/api/users/login", login); 
    app.get("/api/users/:id", getOne);
    app.post("/api/users/create", create);
    app.put("/api/users/update", update);
    app.delete("/api/users/delete/:id", remove);
}; 

module.exports = { 
    users, 
}; 

