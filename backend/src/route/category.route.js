const {getList, create, update, remove } = require("../controller/category.controller.js");
const { validate_token } = require("../controller/auth.controller.js"); 
const category = (app) => { 

    app.get("/api/category", validate_token(), getList); 
    app.post("/api/category/create", validate_token(), create);
    app.put("/api/category/update", validate_token(), update);
    app.delete("/api/category/delete", validate_token(), remove);
};

module.exports = { 
    category, 
}; 

 


