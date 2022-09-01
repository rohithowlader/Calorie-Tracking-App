import jwt from "jsonwebtoken";
import User from "../models/User.mjs";;
import Admin from "../models/admin.mjs";

const auth = async (req,res, next) =>{

    try{
    let token = req.body.token;
    const verifyUser=jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verifyUser);
    next();
    }
    catch(e)
    {

        console.log(e);
        return res.status(404).json({message:"Wrong token"})
    }

}
export default auth;