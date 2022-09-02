import express from "express";
import jwt from 'jsonwebtoken';
import Users from "../models/User.mjs";
import Admin from '../models/admin.mjs';

let loginAdmin = express.Router();

loginAdmin.post('/', async (req, res) => {
    try{
    let { email, password } = req.body;

    const UserFind = await Users.findOne({ email: email });
    const adminFind = await Admin.findOne({ email: email });

    if (UserFind) {
        return res.status(409).json({ message: "email provided is a user" })
    }
    else if (adminFind) {
        if (adminFind.password === password) {
            let uuidAdmin=adminFind.uuidAdmin;
            //const token = jwt.sign({ uuidGenerate }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const token = jwt.sign( {uuidAdmin}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            const filter = { uuidAdmin: adminFind.uuidAdmin };
            const update = {
                token: token
            };

            let doc = await Admin.findOneAndUpdate(filter, update);
            return res.status(200).json({ message: "Admin logged in", token });
        }
        else {
            return res.status(200).json({ message: "Wrong Password" })

        }

    }
    else {
        return res.status(404).json({ message: "Admin Not Found" })
    }
}
catch(e)
{
    console.log(e);
}
});

export default loginAdmin;