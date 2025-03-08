const {db} = require("../config/db.js");
const {logError, isEmptyOrNull} = require("../config/service.js");

// Get the category data list form using api 
const getAll = async (req, res) => { 
    try { 
        var sql = "SELECT users.*, role.Name as RoleName FROM users LEFT JOIN role ON (users.RoleId = role.Id)";
        const [list] = await db.query(sql);
        res.json({
            list: list, 
        }); 
    } catch (err) {
        logError("users.getAll", err, res);
        // res.status(500).json({ message: "Internal Server Error" });
    }
};


// Get the role data spicific form using api
const getOne = async (req, res) => { 
    try { 
        var sql = "SELECT * FROM users WHERE id= :param_id"; 
        var param = { 
            param_id: req.params.id, 
        }
        const [data] = await db.query(sql, param); 
        res.json({ 
            list: data, 
        }); 
    } catch(err) {
        logError("users.getOne", err, res);
    }
};


const create = async (req, res) => {
    try { 
        var Username = req.body.Username;
        var Password = req.body.Password; 
        
        var error = {}; 
        if (isEmptyOrNull(Username)) {
            error.Username = "Username is required"; 
        }
        if (isEmptyOrNull(Password)) {
            error.Password = "Password is required";
    }

    if (Object.keys(error).length > 0) {
        res.json({
            error: error,
        }); 
        return false; 
}   
    
    var parameter = { 
        Username: req.body.Username, 
        Password: req.body.Password,
        RoleId: req.body.RoleId,

    }; 
    
    const [list] = await db.query("INSERT INTO users (Username, Password ) VALUES (:Username, :Password )", parameter); 
    res.json({ 
        list: list, 
    }); 
    } catch(err) {
        logError("users.create", err, res);
    }
};

const update = async(req, res) => { 
    try { 
        var Username = req.body.Username;
        var Password = req.body.Password;
        var id = req.body.id;
        var error = {};
        if (isEmptyOrNull(Username)) {
            error.Username = "Username is required"; 
        }
        if (isEmptyOrNull(Password)) {
            error.Password = "Password is required";
        }
        if (Object.keys(error).length > 0) {
            res.json({
                error: error,
            }); 
            return false;
    }
    var parameter = {
        id: id, 
        Password: req.body.Password,
    };
    const [list] = await db.query("UPDATE users SET Password = :Password WHERE Id = :id", parameter); 
    res.json({ 
        list: list, 
    }); 
    } catch(err) {
        logError("users.update", err, res);
    }
}


const remove = async (req, res) => { 
    try {
        var Id = req.body.id;
        var error = {}; 
        if (isEmptyOrNull(Id)) {
            error.Id = "Id is required"; 
        }
        if (Object.keys(error).length > 0) {
            res.json({
                error: error,
            }); 
            return false;
        } 
        var parameter = {
            Id: Id, 
        };
        const [list] = await db.query("DELETE FROM users WHERE Id = :Id", parameter); 
        res.json({ 
            list: list, 
        }); 
    } catch(err) {
        logError("users.remove", err, res);
    }
};

const login = async (req, res) => { 
    try {
        var Username = req.body.Username;
        var Password = req.body.Password;
        var error = {}; 
        if (isEmptyOrNull(Username)) {
            error.Username = "Username is required"; 
        }
        if (isEmptyOrNull(Password)) {
            error.Password = "Password is required";
        }
        if (Object.keys(error).length > 0) {
            res.json({
                error: error,
            }); 
            return false;
        } 
        var parameter = {
            Username: req.body.Username, 
            Password: req.body.Password,
        };
        const [data] = await db.query("SELECT * FROM users WHERE Username = :Username", parameter); 
        if (data.length > 0) {
            var user = data[0];
            if (user.Password === Password) { 
                res.json({
                    message: "Login Success",
                    list: user, 
                });
            } else {
                res.json({
                    error: {
                        Password: "Password incorrect!",
                
                    }
                });
                return; 
            }
            
        } else {
            res.json({
                error: {
                    Username: "Username does not exist!",
                
                }
            });
            return; 
        } 
    } catch(err) {
        logError("users.login", err, res);
    }
        
};


module.exports = { 
    getAll, 
    getOne, 
    create, 
    update, 
    remove, 
    login
}; 