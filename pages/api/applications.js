const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

export default function handler(req, res) {
    if (req.method === 'GET') {
        if (!req.cookies.token) {
            res.status(406).json({message: "You are not logged in."});
        } else {
            jwt.verify(req.cookies.token, "cs451", (err, decoded) => {
                if (decoded.user_type === "faculty") {
                    console.log(`Saw decoded: ${JSON.stringify(decoded)}`);
                    db.query(`SELECT * FROM applications`, (err, result) => {
                        if (err) {
                            res.status(500).json({message: "Internal server error"});
                        } else {
                            res.status(200).json(result);
                        }
                    }); 
                } else {
                    res.status(406).json({message: "Non-faculty members aren't authorized to view this page."});
                }
            });
        }
    } else {
        res.status(405).json({message: "Method not allowed"})
    }
}