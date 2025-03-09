const { Config } = require("../config/config.js");
const { db } = require("../config/db.js");
const { logError, isEmptyOrNull } = require("../config/service.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users with role names
const getAll = async (req, res) => {
    try {
        const sql = "SELECT users.*, role.Name as RoleName FROM users LEFT JOIN role ON users.RoleId = role.Id";
        const [list] = await db.query(sql);
        res.json({ list });
    } catch (err) {
        logError("users.getAll", err, res);
    }
};

// Get a specific user by ID
const getOne = async (req, res) => {
    try {
        const sql = "SELECT * FROM users WHERE id = ?";
        const [data] = await db.query(sql, [req.params.id]);

        res.json({ list: data });
    } catch (err) {
        logError("users.getOne", err, res);
    }
};

// Create a new user
const create = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        let error = {};

        if (isEmptyOrNull(Username)) error.Username = "Username is required";
        if (isEmptyOrNull(Password)) error.Password = "Password is required";

        if (Object.keys(error).length > 0) {
            return res.json({ error });
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const sql = "INSERT INTO users (Username, Password) VALUES (?, ?)";
        const [list] = await db.query(sql, [Username, hashPassword]);

        res.json({ list });
    } catch (err) {
        logError("users.create", err, res);
    }
};

// Update a user's password
const update = async (req, res) => {
    try {
        const { id, Password } = req.body;
        let error = {};

        if (isEmptyOrNull(id)) error.id = "User ID is required";
        if (isEmptyOrNull(Password)) error.Password = "Password is required";

        if (Object.keys(error).length > 0) {
            return res.json({ error });
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const sql = "UPDATE users SET Password = ? WHERE Id = ?";
        const [list] = await db.query(sql, [hashPassword, id]);

        res.json({ list });
    } catch (err) {
        logError("users.update", err, res);
    }
};

// Delete a user
const remove = async (req, res) => {
    try {
        const { id } = req.body;
        let error = {};

        if (isEmptyOrNull(id)) error.id = "Id is required";

        if (Object.keys(error).length > 0) {
            return res.json({ error });
        }

        const sql = "DELETE FROM users WHERE Id = ?";
        const [list] = await db.query(sql, [id]);

        res.json({ list });
    } catch (err) {
        logError("users.remove", err, res);
    }
};

// User login
const login = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        let error = {};

        if (isEmptyOrNull(Username)) error.Username = "Username is required";
        if (isEmptyOrNull(Password)) error.Password = "Password is required";

        if (Object.keys(error).length > 0) {
            return res.json({ error });
        }

        const sql = "SELECT * FROM users WHERE Username = ?";
        const [data] = await db.query(sql, [Username]);

        if (data.length === 0) {
            return res.json({ error: { Username: "Username does not exist!" } });
        }

        const user = data[0];

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.json({ error: { Password: "Password incorrect!" } });
        }

        delete user.Password;
        // generate JWT 
        var access_token = await jwt.sign({data:user}, Config.ACCESS_TOKEN_KEY, {expiresIn: "1d"});

        res.json({
            message: "Login Success",
            user: user, 
            access_token: access_token, 
        });
    } catch (err) {
        logError("users.login", err, res);
    }
};

const validate_token = () => {
    return (req, res, next) => {
        try {
            const authorization = req.headers.authorization;

            if (!authorization || !authorization.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            const token = authorization.split(" ")[1];

            jwt.verify(token, Config.ACCESS_TOKEN_KEY, (error, decoded) => {
                if (error) {
                    return res.status(401).json({ message: "Unauthorized: Invalid token", error });
                }

                req.user = decoded.data;
                req.user_id = decoded.data.Id;
                next();
            });
        } catch (err) {
            res.status(401).json({ message: "Unauthorized", error: err.message });
        }
    };
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    login,
    validate_token
};
