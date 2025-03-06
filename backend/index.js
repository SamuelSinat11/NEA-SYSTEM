const express = require("express"); // import express modules 
const app = express(); // app extend
const cors = require("cors"); 
app.use(cors({origin: "http://localhost:3000"})); // cors origin
app.use(express.json()); // json body from client 

// import route 
const {category} = require("./src/route/category.route.js");
const {role} = require("./src/route/role.route.js");

// call route 
category(app); 
role(app); 


app.get("/", (req, res) => { 
    res.send("Hello Express and Node.js "); 
}); 

const PORT = 8082; 
app.listen(PORT, () => { 
    console.log("Server running at: http://localhost:" + PORT); 
});
