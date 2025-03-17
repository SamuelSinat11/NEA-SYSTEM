const { validate_token } = require("../controller/auth.controller.js");
const { getAll, create, update, remove, getOne, multiple } = require("../controller/seeker.controller.js");

const seeker = (app) => {
    app.get("/api/seeker", validate_token(), getAll); 
    app.get("/api/seeker/:Roll_id", getOne); 
    app.post("/api/seeker/create", create); 
    app.post("/api/seeker/create/multiple", multiple); 
    app.put("/api/seeker/update/:Roll_id", update); 
    app.delete("/api/seeker/delete/:Roll_id", remove);
};

module.exports = { seeker };