
const { validate_token } = require("../controller/auth.controller.js");
const {getList, create, update, remove} = require("../controller/supplier.controller.js"); 


const supplier = (app) => { 
    app.get("/api/supplier", validate_token(), getList); 
    app.post("/api/supplier", validate_token(), create); 
    app.put("/api/supplier", validate_token(), update); 
    app.delete("/api/supplier", validate_token(), remove); 
}; 


module.exports = { 
    supplier
}