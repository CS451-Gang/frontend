import jsonwebtoken from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useEffect } from 'react';
import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

const StudentApplication = (req: NextApiRequest, res: NextApiResponse) => {
    const studentId = req.query.student_id;
    const decoded = jsonwebtoken.decode(req.cookies.token);
    console.log(studentId, decoded.sub);
    if (studentId == decoded.sub) {
        db.query(`SELECT * FROM applications WHERE id = ${studentId}`, (err, results) => {
            if (err) {
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err
                });
            } else {
                console.log(results)
                if (Array.isArray(results) && results.length > 0) {
                    res.status(200).json({
                        message: "Success",
                        data: results[0]
                    });
                } else {
                    res.status(404).json({ message: "No Application Found" });
                }
            }
        });
    } else {
        res.status(401).json({
            message: "You're not authorized to view this student's application.",
        });
    }

    // res.end();
}

export default StudentApplication;