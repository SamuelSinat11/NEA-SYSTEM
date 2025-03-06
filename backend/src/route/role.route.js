const {getAll, create, update, remove, getOne, multiple} = require ("../controller/role.controller.js");

const role = (app) => { 
    
    app.get("/api/role", getAll); 
    app.get("/api/role/:role_id", getOne); 
    app.post("/api/role/create", create);
    app.post("/api/role/create/multiple", multiple)
    app.put("/api/role/update", update);
    app.delete("/api/role/delete", remove);
}; 

module.exports = { 
    role, 
}; 

