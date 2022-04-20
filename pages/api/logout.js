export default async (req, res) => {
    res.setHeader('Set-Cookie', `token=; HttpOnly`);
    res.status(200).json({message: "Successfully logged out."});
}