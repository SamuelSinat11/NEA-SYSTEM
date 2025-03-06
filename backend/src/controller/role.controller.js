const {db} = require("../config/db.js");
const {logError} = require("../config/service.js");

// Get the role data list form using api 
const getAll = async (req, res) => { 
    try{ 
        const [data] = await db.query("SELECT * FROM role;");
        res.json({ 
            list: data, 
        }); 
    } catch(err) {
        logError("role.getAll", err, res);
    }
};

// Get the role data spicific form using api
const getOne = async (req, res) => { 
    try { 
        var sql = "SELECT * FROM role WHERE role_id = :param_id"; 
        var param = { 
            param_id: req.params.role_id, 
        }
        const [data] = await db.query(sql, param); 
        res.json({ 
            list: data, 
        }); 
    } catch(err) {
        logError("role.getOne", err, res);
    }
};


// create the role data using api 
const create = async(req, res) => {
    try { 
        var sql = "INSERT INTO role(name, code, status) VALUES (:name, :code, :status)"; 
        var param = {
            name: req.body.name, 
            code: req.body.code, 
            status: req.body.status, 
        }

        const [data] = await db.query(sql, param); 
        res.json({ 
            data: data, 
        });
    } catch(err) {
        logError("role.create", err, res);
    }
}; 

// Create the multiple data using api 
const multiple = async(req, res) => {
    try { 
        var sql = "INSERT INTO role(name, code, status) VALUES :arrRecord"; 
        var param = {
            arrRecord: req.body.arr_role, 
        }
        const [data] = await db.query(sql, param); 
        res.json({ 
            message: "Insert" + req.body.arr_role.length + " Record",
            list: data, 
        });
    } catch(err) {
        logError("role.create", err, res);
    }
}; 

// update the role data using api 
const update = async(req, res) => {
    try { 
        var sql = "UPDATE role SET name = :name, code = :code, status = : status WHERE role_id = :role_id"; 
        var param = {
            role_id: req.body.role_id, 
            name: req.body.name, 
            code: req.body.code, 
            status: req.body.status, 
        }
        const [data] = await db.query(sql, param); 
        res.json({ 
            list: data, 
        });
    } catch(err) {
        logError("role.update", err, res);
    }
}; 

// Delete the role data using api 
const remove = (req, res) => { 
    try { 
        var sql = "DELETE FROM role WHERE role_id = :role_id"; 
        var param = {
            role_id: req.body.role_id, 
        }
        const [data] = db.query(sql, param); 
        res.json({ 
            data: data, 
        }); 
    } catch(err) {
        logError("role.remove", err, res);
    }
}; 


module.exports = { 
    getAll, 
    create, 
    update, 
    remove, 
    getOne, 
    multiple
}


