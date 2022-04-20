const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generate_jwt(minutes_to_live, user_id, email, is_faculty) {
    return jwt.sign({
        "exp": Math.floor((Date.now() / 1000) + (minutes_to_live * 60)),
        "iat": Math.floor(Date.now() / 1000),
        "sub": user_id,
        "email": email,
        "is_faculty": is_faculty,
    }, "cs451", { algorithm: "HS256" });
}

const secret_auth_db = {
    id: 1,
    email: "admin@umkc.edu",
    salt: "$2b$12$Ygn9KS87EEVapR3xadxeNO",
    hash: "$2b$12$Ygn9KS87EEVapR3xadxeNOi2ij0Edb1fNIIdf5fzuSQ4fDctbqwGS",
    is_faculty: true
}

export default function handler(req, res) {
    if (req.cookies.token) {
        res.status(406).send({message: "You are already logged in."});
    } else if (req.method === 'POST') {
        const body = req.body;
        if (body.email === secret_auth_db.email) {
            bcrypt.compare(body.password, secret_auth_db.hash, (err, result) => {
                if (result) {
                    const token = generate_jwt(30, secret_auth_db.id, body.email, secret_auth_db.is_faculty);

                    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict`);
                    res.status(200).send({
                        message: "Successfully logged in!",
                    })
                } else {
                    res.status(401).send({
                        message: "Invalid credentials"
                    })
                }
            })
        } else {
            res.status(401).send({
                message: "Email not found."
            })
        }
    } else {
        res.status(405).json({message: "Method not allowed"})
    }
}