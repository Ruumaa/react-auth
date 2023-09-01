import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req,res) =>{
    try{
        //catch refresh token dari cookies
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        //mencari user berdasarkan refresh token
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken //mencocokkan refresh token yg diberikan dengan yg di database
            }
        })
        if(!user[0]) return res.sendStatus(403);
        //verifikasi refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id
            const name = user[0].name
            const email = user[0].email
            //membuat accesstoken baru
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            })
            //return hasilnya
            res.json({accessToken})
        }) 

    } catch(err){
        console.error(err)
    }
}