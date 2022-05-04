import { resolve } from "path";

const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

export default function helper(req, res) {
    if (req.method === 'POST') {
        return handleApplication(req, res);
    } else {
        res.status(405).setHeader('Allow', 'POST').end("Method not allowed");
    }
}

const handleApplication = async (req, res) => {
    if (!req.cookies.token) {
        res.status(406).json({ message: "You are not logged in." });
    } else {
        console.log(JSON.stringify(req.body))
        const { certTerm, courses, currMajor, email, firstName, gradDegree, gradSem, grader, isGtaCert, isIntl, labInstructor, lastName, prevDegree, stuID, umkcGPA, umkcHours, undergradDegree } = req.body;
        
        jwt.verify(req.cookies.token, "cs451", (err, decoded) => {
            if (err) {
                res.status(406).json({ message: "You are not logged in." });
            } else {
                console.log(`Saw decoded: ${JSON.stringify(decoded)}`);
                if (decoded.email === req.body.email) {
                    db.query(`SELECT * FROM applications WHERE email = ?`, [req.body.email], (err, result) => {
                        if (err) res.status(500).json({ message: "Internal server error" });
                        else if (result.length > 0) {
                            res.status(406).json({ message: "You have already applied." });
                        } else {
                            let applyingFor = undefined;

                            if (labInstructor && grader) {
                                applyingFor = "Both";
                            } else if (labInstructor) {
                                applyingFor = "Lab Instructor";
                            } else if (grader) {
                                applyingFor = "Grader";
                            }

                            db.execute(`INSERT INTO applications (
                                id, full_name, email, current_level, graduating_semester, cumulative_gpa, hours_completed, undergraduate_degree, current_major, applying_for, international_student, gta_certified, gta_certification_term, gta_previous_degree
                            ) VALUES (
                                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                            )`, [stuID, `${firstName} ${lastName}`, email, gradDegree, gradSem, umkcGPA, umkcHours, undergradDegree, currMajor, applyingFor, isIntl ? true : false, isGtaCert, certTerm, prevDegree], (err, result) => {
                                if (err) {
                                    res.status(500).json({ message: "Internal server error while submitting application to database." });
                                } else {
                                    res.status(201).json({ message: "Application submitted successfully!" });
                                }
                            });
                        }
                    });
                } else {
                    console.log(`Saw email ${decoded.email} and ${req.body.email}`);
                }
            }
            // res.status(407).end();
        });
    }
}
