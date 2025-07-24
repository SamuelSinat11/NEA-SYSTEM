const { db } = require("../config/db.js");
const { logError } = require("../config/service.js");

const getList = async (req, res) => {
  try {
    // ✅ Fixed SQL syntax: "form" -> "from", "name code" -> "name, code"
    const [category] = await db.query("SELECT id, name, description FROM category");
    const [role] = await db.query("SELECT id, name, code FROM role");
    const [supplier] = await db.query("SELECT id, name, code FROM supplier");

    const purchase_status = [
      { label: "Pending", value: "Pending" }, // Fixed typo: Peding -> Pending
      { label: "Approved", value: "Approved" },
      { label: "Shipped", value: "Shipped" }, // Fixed typo: Shiped -> Shipped
      { label: "Received", value: "Received" },
      { label: "Issues", value: "Issues" },
    ];

    const brand = [ 
      {name: "Apple", country: "USA"}, 
      {name: "Samsung", country: "South Korea"}, 
      {name: "Dell", country: "USA"}, 
      {name: "HP", country: "USA"}, 
      {name: "Lenovo", country: "Taiwan"}, 
      {name: "Asus", country: "China"},
    ]

    res.json({
      category,
      role,
      supplier,
      purchase_status,
    });
  } catch (err) {
    logError("config.getList", err, res);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getList,
};
