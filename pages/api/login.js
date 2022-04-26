const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const mysql = require("mysql2");

function generate_jwt(minutes_to_live, user_id, email, user_type) {
    return jwt.sign({
        "exp": Math.floor((Date.now() / 1000) + (minutes_to_live * 60)),
        "iat": Math.floor(Date.now() / 1000),
        "sub": user_id,
        "email": email,
        "user_type": user_type,
    }, "cs451", { algorithm: "HS256" });
}

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gta"
});

export default function handler(request, response) {
    if (request.cookies.token) {
        response.status(406).send({message: "You are already logged in."});
    } else if (request.method === 'POST') {
        const body = request.body;
        db.query(`SELECT * FROM accounts WHERE email = ?`, [body.email], (err, result) => {
            if (err) {
                response.status(500).send({message: `${err}`});
            } else if (result.length === 0) {
                response.status(406).send({message: "Invalid email or password."});
            } else {
                bcrypt.compare(body.password, result[0].password_hash, (err, compare_result) => {
                    if (err) {
                        response.status(500).send({message: "Internal server error"});
                    } else if (compare_result) {
                        const token = generate_jwt(60, result[0].user_id, result[0].email, result[0].user_type);
                        response.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict`);
                        response.status(200).send({message: "Successfully logged in.", user_type: result[0].user_type});
                    } else {
                        response.status(406).send({message: "Invalid email or password."});
                    }
                });
            }
        });
    } else {
        response.status(405).send({message: "Method not allowed"});
    }
}
