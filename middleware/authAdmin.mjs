import jwt from "jsonwebtoken";
import Users from "../models/User.mjs";;
import Admin from "../models/admin.mjs";

const authAdmin = async (req, res, next) => {

    try {
        let { token, uuidAdmin } = req.body;


        const UserFind = await Users.findOne({ uuidUser: uuidAdmin });
        const AdminFind = await Admin.findOne({ uuidAdmin: uuidAdmin });

        //checking if user is present
        if (UserFind) {
            return res.status(404).json({ message: "Invalid Admin's uuid" })
        }
        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid Admin's uuid" })
        }

        if (token != AdminFind.token)
            return res.status(404).json({ message: "Wrong Admin Token" })



        const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verifyUser) {
            console.log("Admin Authentication succesfull");
        }
        next();
    }
    catch (e) {

        console.log(e);
        return res.status(404).json({ message: "Wrong token" })
    }

}
export default authAdmin;