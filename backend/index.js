const express = require("express"); // import express modules 
const app = express(); // app extend
const cors = require("cors"); 
app.use(cors({origin: "*"})); // cors origin
app.use(express.json()); // json body from client 

// import route 
const {users} = require("./src/route/users.route.js");
const {category} = require("./src/route/category.route.js");
const {role} = require("./src/route/role.route.js");

// call route 
category(app); 
role(app); 
users(app); 


app.get("/", (req, res) => { 
    res.send("Hello Express and Node.js "); 
}); 

const PORT = 8081; 
app.listen(PORT, () => { 
    console.log("Server running at: http://localhost:" + PORT); 
});
