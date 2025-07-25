const {getAll, create, update, remove, getOne, multiple} = require ("../controller/role.controller.js");
const role = (app) => { 
    
    app.get("/api/role", getAll); 
    app.get("/api/role/:role_id", getOne); 
    app.post("/api/role", create);
    app.post("/api/role", multiple)
    app.put("/api/role", update);
    app.delete("/api/role", remove);
}; 

module.exports = { 
    role, 
}; 

