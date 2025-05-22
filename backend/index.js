const express = require("express"); // import express modules 
const app = express(); // app extend
const cors = require("cors"); 
app.use(cors({origin: "*"})); // cors origin
app.use(express.json()); // json body from client 

// import route 
const {auth} = require("./src/route/auth.route.js");
const {category} = require("./src/route/category.route.js");
const {role} = require("./src/route/role.route.js");
const {seeker} = require("./src/route/seeker.route.js");


// call route 
auth(app);
category(app); 
role(app); 
seeker(app); 


app.get("/", (req, res) => { 
    res.send("Hello Express and Node.js "); 
}); 

const PORT = 8081; 
app.listen(PORT, () => { 
    console.log("Server running at: http://localhost:" + PORT); 
});
