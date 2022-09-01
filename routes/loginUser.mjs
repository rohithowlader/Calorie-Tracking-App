import express from "express";
import jwt from 'jsonwebtoken';
import Users from "../models/User.mjs";
import Admin from '../models/admin.mjs';

let loginUser = express.Router();

loginUser.post('/', async (req, res) => {
    try{
    const { email, password } = req.body;

    const UserFind = await Users.findOne({ email: email });
    const adminFind = await Admin.findOne({ email: email });

    if (adminFind) {
        return res.status(409).json({ message: "email provided is an admin" })
    }
    else if (UserFind) {
        if (UserFind.password === password) {
            console.log(UserFind.uuid)
            let uuid=UserFind.uuid;
            //const token = jwt.sign({ uuidGenerate }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const token = jwt.sign( {uuid}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const filter = { uuid: UserFind.uuid };
            const update = {
                token: token
            };

            let doc = await Users.findOneAndUpdate(filter, update);
            return res.status(200).json({ message: "User logged in", token });
        }
        else {
            return res.status(200).json({ message: "Wrong Password" })

        }

    }
    else {
        return res.status(404).json({ message: "User Not Found" })
    }
}
catch(e)
{
    console.log(e);
}
});

export default loginUser;