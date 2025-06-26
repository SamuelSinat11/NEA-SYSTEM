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


// update the role data using api 
const update = async(req, res) => {
   try { 
        var sql = "UPDATE supplier set name=:name, code=:code, tel=:tel, email=:email, address=:address, website=:website, note=:note"; 
        var [data] = await db.query(sql, {
            ...req.body, 
        }); 

        res.json({ 
            data: data, 
            message: "Update success!",
        });
    } catch(err) {
        logError("supplier.update", err, res);
    }
}; 

// Delete the role data using api 
const remove = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const [result] = await db.query(
      "DELETE FROM supplier WHERE id = :id",
      { id }
    );

    res.json({
      data: result,
      message: "Data deleted successfully!",
    });
  } catch (err) {
    logError("remove.supplier", err, res);
  }
};


module.exports = { 
    getList, 
    create, 
    update, 
    remove, 
}


