import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    //ambil header "Authorization" dari req
  const authHeader = req.headers["authorization"];
  //memisahkan bearer token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  //verfikasi token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    //jika berhasil, data disimpan dari decoded ke req.email
    req.email = decoded.email;
    next();
  });
};
