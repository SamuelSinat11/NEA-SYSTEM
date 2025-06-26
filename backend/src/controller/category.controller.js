const {db} = require("../config/db.js");
const {logError} = require("../config/service.js");

// Get the category data list form using api 
const getList = async (req, res) => { 
    try { 
    const [data] = await db.query("SELECT * FROM category;");
    res.json({
        list: data, 
    }); 
    } catch(err) {
        logError("category.getAll", err, res);
        // res.sendStatus(500).message("Internal Server Error");
    }
};

const create = async (req, res) => {
  try {
    const sql = "INSERT INTO category (name, description, parent_id, status) VALUES (?, ?, ?, ?)";
    const param = [
      req.body.name,
      req.body.description,
      req.body.parent_id,
      req.body.status,
    ];

    const [result] = await db.query(sql, param);

    res.json({
      param: param, 
      message: "Insert success!",
    });

   } catch(err) {
        logError("supplier.create", err, res);
    }
};


const update = async(req, res) => {
   try { 
    var sql = "UPDATE category SET name = :name, description = :description, parent_id = :parent_id, status = :status WHERE id = :id";
    
    var param = {
        id: req.body.id, 
        name: req.body.name, 
        description: req.body.description, 
        parent_id: req.body.parent_id, 
        status: req.body.status, 
    }

    const [data] = await db.query(sql, param);
    res.json({
     
        data: data,
    }); 
   } catch(err) {
    logError("category.update", err, res);
   }
}; 

const remove = (req, res) => {
  try{ 
    var sql = "DELETE FROM category WHERE id=:id";
    var param = {
        id: req.body.id, 
    }
    const [data] = db.query(sql, param); 
    res.json({ 
        data: data, 
    }); 
  } catch(err) {
    logError("category.remove", err, res);
  }
}; 

module.exports = { 
    getList, 
    create, 
    update, 
    remove
}; 