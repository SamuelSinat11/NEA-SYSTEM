const {db} = require("../config/db.js");
const {logError} = require("../config/service.js");

// Get the role data list form using api 
const getList = async (req, res) => { 
    try{ 
        const [list] = await db.query("SELECT * FROM supplier");
        res.json({ 
            list: list, 
        }); 
    } catch(err) {
        logError("supplier.getAll", err, res);
    }
};

// id	name	code	tel	email	address	website	note	create_by	create_at
// create the role data using api 
const create = async(req, res) => {
    try { 
        var sql = "INSERT INTO supplier(name,code,tel,email,address,website,note,create_by) VALUES (:name,:code,:tel,:email,:address,:website,:note,:create_by)"; 
        var [data] = await db.query(sql, {
            // name: req.body.name, 
            // code: req.body.code, 
            // tel: req.body.tel, 
            // email: req.body.email, 
            // address: req.body.address, 
            // website: req.body.website, 
            // note: req.body.note, 
            ...req.body,
            create_by: req.auth?.name, 
        }); 

        res.json({ 
            data: data, 
            message: "Insert success!",
        });
    } catch(err) {
        logError("supplier.create", err, res);
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
    getList, 
    create, 
    update, 
    remove, 
    multiple
}


