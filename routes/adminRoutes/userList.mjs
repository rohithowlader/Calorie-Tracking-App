import express from 'express';
import Users from "../../models/User.mjs";

let userList = express.Router();

userList.post('/', async (req, res) => {

    try {
        const AdminFind = await Users.findOne({ uuidAdmin: req.body.uuidAdmin });
        //checking if admin is present
        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }
        const UserFind = await Users.find();
        let usersList=[];
        for(let i in UserFind)
        {
        let fname=UserFind[i].fname;
        let lname=UserFind[i].lname;
        let email=UserFind[i].email;
        let mobile=UserFind[i].mobile;
        let uuidUser=UserFind[i].uuidUser;
        usersList[i]={fname,lname,email,mobile,uuidUser}
        }
        
        return res.status(200).json({
            usersList

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default userList;

