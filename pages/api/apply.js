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
    console.log(`apply.js saw req.body: ${JSON.stringify(req.body)}`);
    if (!req.cookies.token) {
        res.status(406).json({ message: "You are not logged in." });
    } else {
        // console.log(JSON.stringify(req.body))
        const { certTerm, currMajor, email, fullName, gradDegree, gradSem, grader, isGtaCert, course, grade, isIntl, labInstructor, prevDegree, stuID, umkcGPA, umkcHours, undergradDegree } = req.body;
        
        jwt.verify(req.cookies.token, "cs451", (err, decoded) => {
            if (err) {
                res.status(406).json({ message: "You are not logged in." });
            } else {
                console.log(`Saw decoded: ${JSON.stringify(decoded)}`);
                if (decoded.email === req.body.email) {
                    
                    let applyingFor = undefined;

                    if (labInstructor && grader) {
                        applyingFor = "Both";
                    } else if (labInstructor) {
                        applyingFor = "Lab Instructor";
                    } else if (grader) {
                        applyingFor = "Grader";
                    } else {
                        res.status(406).json({ message: "You must apply to be a lab instructor, grader, or both." });
                    }

                    db.execute(`INSERT INTO applications (
                        student_id, full_name, email, current_level, graduating_semester, cumulative_gpa, hours_completed, undergraduate_degree, current_major, applying_for, course_id, grade_value, international_student, gta_certified, gta_certification_term, gta_previous_degree
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    )`, [stuID, fullName, email, gradDegree, gradSem, umkcGPA, umkcHours, undergradDegree, currMajor, applyingFor, course, grade, isIntl ? true : false, isGtaCert, certTerm, prevDegree], (err, result) => {
                        if (err) {
                            console.log(JSON.stringify(err))
                            res.status(500).json({ message: "Internal server error while submitting application to database." });
                        } else {
                            res.status(201).json({ message: "Application submitted successfully!" });
                        }
                    });
                } else {
                    console.log(`Saw email ${decoded.email} and ${req.body.email}`);
                    res.status(407).json({ message: "Unexpected" });
                }
            }
        });
    }
}
