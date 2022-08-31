import express from 'express';
import jwt from 'jsonwebtoken';
import Users from "../models/User.mjs";
import Admin from '../models/admin.mjs';
import { v4 as uuidv4 } from 'uuid';

let verifyPassword = express.Router();

verifyPassword.post('/', async (req, res) => {

    try {
        const { fname, lname, email, mobile, password } = req.body;

        const UserFind = await Users.findOne({ email: email });
        const adminFind = await Admin.findOne({ email: email });


        if (!UserFind && !adminFind) {

            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            var uuidGenerate = uuidv4();
            const user = new Admin({
                fname,
                lname,
                email,
                mobile,
                uuid: uuidGenerate,
                password,
                date: Date.now(),
                token: token
            })
            const response = await user.save();
            return res.status(200).json({
                messsage: `Admin ${user.fname} Created`,
                token: token
            })
        }
        else if (UserFind) {
            return res.status(409).json({ message: "User Already Present" });
        }
        else {
            return res.status(409).json({ message: "Admin Already Present" });
        }
    }
    catch (e) {
        console.log(e);
    }

});

export default verifyPassword;

