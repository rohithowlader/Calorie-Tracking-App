import jwt from "jsonwebtoken";
import Users from "../models/User.mjs";;
import Admin from "../models/admin.mjs";

const auth = async (req, res, next) => {

    try {
        let { token, uuidAdmin, uuidUser } = req.body;
        // console.log(token)
        // console.log(req.body.uuidUser)
        // console.log(req.body.uuidAdmin)


        const UserFind = await Users.findOne({ uuidUser: req.body.uuidUser });
        const AdminFind = await Admin.findOne({ uuidAdmin: req.body.uuidAdmin });

        //checking if user is present
        if (!UserFind && uuidAdmin === undefined) {
            return res.status(404).json({ message: "Invalid user's uuid" })
        }
        if (!AdminFind && uuidUser === undefined) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }

        if (uuidAdmin === undefined)
            if (token != UserFind.token)
                return res.status(404).json({ message: "Wrong User Token" })

        if (uuidUser === undefined)
            if (token != AdminFind.token)

                return res.status(404).json({ message: "Wrong Admin Token" })



        const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verifyUser) {
            console.log("Authentication User succesfull");
        }
        next();
    }
    catch (e) {

        console.log(e);
        return res.status(404).json({ message: "Wrong token " })
    }

}
export default auth;