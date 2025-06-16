const {getAll, create, update, remove } = require("../controller/category.controller.js");

const category = (app) => { 

    app.get("/api/category", getAll); 
    app.post("/api/category/create", create);
    app.put("/api/category/update", update);
    app.delete("/api/category/delete", remove);
};

module.exports = { 
    category, 
}; 

 


