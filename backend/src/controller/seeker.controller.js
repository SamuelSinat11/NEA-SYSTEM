const { db } = require("../config/db.js");
const { logError } = require("../config/service.js");

// Get all seekers
const getAll = async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM seekers;");
        res.json({ list: data });
    } catch (err) {
        logError("seekers.getAll", err, res);
    }
};

// Get a single seeker by ID
const getOne = async (req, res) => {
    try {
        const sql = "SELECT * FROM seekers WHERE Roll_id = ?";
        const [data] = await db.query(sql, [req.params.Roll_id]);

        res.json({ list: data });
    } catch (err) {
        logError("seekers.getOne", err, res);
    }
};

// Create a new seeker
const create = async (req, res) => {
    try {
        const sql = `INSERT INTO seekers 
            (FullName, Gender, DOB, POB, PhoneNumber, AppliedFor, Skill, Education, Company, Postion, ISIC4, CV, Salary, Remarks, Status, SuggestBy) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            req.body.FullName,
            req.body.Gender,
            req.body.DOB,
            req.body.POB,
            req.body.PhoneNumber,
            req.body.AppliedFor,
            req.body.Skill,
            req.body.Education,
            req.body.Company,
            req.body.Postion,
            req.body.ISIC4,
            req.body.CV,
            req.body.Salary,
            req.body.Remarks,
            req.body.Status,
            req.body.SuggestBy
        ];

        const [data] = await db.query(sql, values); 

        res.status(201).json({ message: "Seeker created successfully", data });
    } catch (err) {
        console.error("Database error:", err); 
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

// Insert multiple seekers
const multiple = async (req, res) => {
    try {
        const seekers = req.body.arrRecord;
        if (!Array.isArray(seekers) || seekers.length === 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const sql = `INSERT INTO seekers 
            (FullName, Gender, DOB, POB, PhoneNumber, AppliedFor, Skill, Education, Company, Postion, ISIC4, CV, Salary, Remarks, Status, SuggestBy) 
            VALUES ?`;

        const values = seekers.map(seeker => [
            seeker.FullName,
            seeker.Gender,
            seeker.DOB,
            seeker.POB,
            seeker.PhoneNumber,
            seeker.AppliedFor,
            seeker.Skill,
            seeker.Education,
            seeker.Company,
            seeker.Postion,
            seeker.ISIC4,
            seeker.CV,
            seeker.Salary,
            seeker.Remarks,
            seeker.Status,
            seeker.SuggestBy
        ]);

        const [data] = await db.query(sql, [values]);
        res.json({
            message: `Inserted ${seekers.length} records`,
            data
        });
    } catch (err) {
        logError("seekers.multiple", err, res);
    }
};

// Update seeker details
const update = async (req, res) => {
    try {
        const sql = `UPDATE seekers SET 
            FullName = ?, Gender = ?, DOB = ?, POB = ?, PhoneNumber = ?, AppliedFor = ?, Skill = ?, 
            Education = ?, Company = ?, Postion = ?, ISIC4 = ?, CV = ?, Salary = ?, Remarks = ?, 
            Status = ?, SuggestBy = ? 
            WHERE Roll_id = ?`;

        const values = [
            req.body.FullName,
            req.body.Gender,
            req.body.DOB,
            req.body.POB,
            req.body.PhoneNumber,
            req.body.AppliedFor,
            req.body.Skill,
            req.body.Education,
            req.body.Company,
            req.body.Postion,
            req.body.ISIC4,
            req.body.CV,
            req.body.Salary,
            req.body.Remarks,
            req.body.Status,
            req.body.SuggestBy,
            req.params.Roll_id
        ];

        const [data] = await db.query(sql, values);
        res.json({ data });
    } catch (err) {
        logError("seekers.update", err, res);
    }
};

// Delete seeker by ID
const remove = async (req, res) => {
    try {
        const sql = "DELETE FROM seekers WHERE Roll_id = ?";
        const [data] = await db.query(sql, [req.params.Roll_id]);

        res.json({ message: "Record deleted successfully", data });
    } catch (err) {
        logError("seekers.remove", err, res);
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    multiple,
    update,
    remove
};
