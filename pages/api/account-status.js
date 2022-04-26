const jwt = require("jsonwebtoken");

export default function handler(req, res) {
    if (req.method === 'GET') {
        if (!req.cookies.token) {
            res.status(406).json({message: "You are not logged in."});
        } else {
            jwt.verify(req.cookies.token, "cs451", (err, decoded) => {
                if (err) {
                    res.status(500).json({message: "Internal server error"});
                }
                else {
                    res.status(200).json(decoded);
                }
            });
        }
    } else {
        res.status(405).json({message: "Method not allowed"})
    }
}