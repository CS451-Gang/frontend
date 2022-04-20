const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

export default function handler(req, res) {
    if (!req.cookies.token) {
        res.redirect("/faculty/login");
        res.status(406).send({message: "You are not logged in."});
    } else if (req.method === 'GET') {
        db.query(`SELECT * FROM applications`, (err, result) => {
            if (err) {
                res.status(500).send({message: "Internal server error"});
            } else {
                res.status(200).send(result);
            }
        });
    } else {
        res.status(405).json({message: "Method not allowed"})
    }
}