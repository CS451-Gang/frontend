export default async (req, res) => {
    res.setHeader('Set-Cookie', `token=""; Expires=0; HttpOnly`);
    res.status(200).json({message: "Successfully logged out."});
}