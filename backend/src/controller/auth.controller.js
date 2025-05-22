const { logError } = require("../config/service.js");
const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keyToken = "your-secret-key"; // Ensure you set this securely

const getList = async (req, res) => {
    try {
        let sql =
        " SELECT " +
        " u.id, " +
        " u.name, " +
        " u.username, " +
        " u.is_active, " +
        " r.name AS role_name " + // Removed the extra comma here
        " FROM users u " +
        " INNER JOIN role r ON (u.role_id = r.id)";
        const [list] = await db.query(sql);
        res.json({
            list,
        });
    } catch (err) {
        logError("auth.getList", err, res);
    }
};

const register = async (req, res) => {
    try { 
        // Hash password 
        let password = bcrypt.hashSync(req.body.password, 10);

        let sql = `
            INSERT INTO users (role_id, name, username, password, is_active, create_by) 
            VALUES (:role_id, :name, :username, :password, :is_active, :create_by);
        `;

        let data = await db.query(sql, {
            role_id: req.body.role_id, 
            name: req.body.name, 
            username: req.body.username, 
            password: password, 
            is_active: req.body.is_active, 
            create_by: req.body.create_by
        }); 
        
        res.json({ 
            message: "Create Account Successfully",
            data: data
        });

    } catch (err) {
        logError("auth.register", err, res);
    }
};

const login = async (req, res) => {
    try { 
        let { username, password } = req.body;
        let sql = 
            "SELECT" + 
            " u.*," + 
            " r.name as role_name" + 
            " FROM users u" + 
            " INNER JOIN role r ON u.role_id = r.id" + 
            " WHERE u.username = :username";
        
        let [data] = await db.query(sql, { username });

        if (data.length === 0) {
            return res.json({
                error: { username: "Username does not exist!" }
            });
        }

        let dbPass = data[0].password;
        let isCorrectPass = bcrypt.compareSync(password, dbPass);

        if (!isCorrectPass) {
            return res.json({
                error: { password: "Password incorrect!" }
            });
        }

        let obj = { 
            profile: data[0], 
            permission: ["view_all", "delete", "edit"]
        };

        res.json({ 
            message: "Login Successfully",
            ...obj, 
            access_token: await getAccessToken(obj)
        });

    } catch (err) {
        logError("auth.login", err, res);
    }
};

const profile = async (req, res) => {
    try { 
       res.json({ profile: req.profile });
    } catch (err) {
        logError("auth.profile", err, res);
    }
};

const validate_token = () => {
    return (req, res, next) => {
        let authorization = req.headers.authorization;
        let token_from_client = null; 

        if (authorization && authorization !== "") { 
            let tokenParts = authorization.split(" ");
            if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
                token_from_client = tokenParts[1];
            }
        }

        if (!token_from_client) { 
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token_from_client, keyToken, (error, result) => {
            if (error) { 
                return res.status(401).json({
                    message: "Unauthorized",
                    error
                });
            } 
            req.current_id = result.data.profile.id;
            req.profile = result.data.profile; 
            req.permission = result.data.permission; 
            next();
        });
    };
};

const getAccessToken = async (paramData) => {
    return jwt.sign({ data: paramData }, keyToken, { expiresIn: "1d" });
};

module.exports = {
    register, 
    login, 
    profile,     
    validate_token, 
    getList
};
