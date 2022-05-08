import jsonwebtoken from 'jsonwebtoken';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { useEffect, useState } from 'react';
import mysql from "mysql2";
import axios from 'axios';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

const StudentApplication = (req, res) => {
    const decoded = jsonwebtoken.decode(req.cookies.token);
    const token_student_id = decoded.sub;
    console.log(token_student_id);
    if (token_student_id) {
        if (req.method === 'DELETE') {
            console.log(`query: ${JSON.stringify(req.query)}`);
            const { applicationId } = req.query;
            db.query(`SELECT * FROM applications WHERE id = ?`, [applicationId], (err, results) => {
                if (err) {
                    res.status(500).json({message: "Internal server error"});
                } else if (results.length === 0) {
                    res.status(406).json({message: "Application not found."});
                } else {
                    console.log("got to the point of deletion")
                    db.query(`DELETE FROM applications WHERE id = ?`, [applicationId], (err, results) => {
                        if (err) {
                            res.status(500).json({message: "Internal server error"});
                        } else {
                            res.status(200).json({message: "Application deleted."});
                        }
                    });
                }
            });
        } else if (req.method === 'GET') {
            const { student_id } = req.query;
            if (student_id == token_student_id) {
                db.query(`SELECT * FROM applications WHERE student_id = ?`, [student_id], (err, results) => {
                    console.log(results);
                    if (err) {
                        console.log(JSON.stringify(err));
                        res.status(500).json({
                            message: "Internal Server Error",
                            error: err
                        });
                    } else {
                        if (Array.isArray(results) && results.length > 0) {
                            res.status(200).json({
                                message: "Success",
                                data: results
                            });
                        } else {
                            res.status(404).json({ message: "No Application Found" });
                        }
                    }
                });
            }
        } else {
            res.status(401).json({
                message: "You're not authorized to view this student's application.",
            });
        }
    } else {
        res.status(406).json({ message: "You are not logged in." });
    }
}

export default StudentApplication;