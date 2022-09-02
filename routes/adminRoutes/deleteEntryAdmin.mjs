import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";
import Admin from "../../models/admin.mjs"

let deleteEntryAdmin = express.Router();


deleteEntryAdmin.post('/', async (req, res) => {

    try {

        let {uuidAdmin, uuidUser, uuidEntry} = req.body;

        //checking if admin is present
        const AdminFind = await Admin.findOne({ uuidAdmin: uuidAdmin });
        
        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }
        //Checking if user is present
        const UserFind = await Users.findOne({uuidUser: uuidUser });
        
        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid user's uuid"})
        }

        const foodEntryFind = await foodEntry.findOne({$and: [{ uuidUser: uuidUser},{uuidEntry: uuidEntry } ]});

        if(!foodEntryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        const deleteFoodEntry= await foodEntry.findOneAndDelete({$and: [{ uuidUser: uuidUser},{uuidEntry: uuidEntry } ]})
        
        return res.status(200).json({
            messsage: `Entry Deleted`
        });
    }


    catch (e) {
        console.log(e);
    }
});

export default deleteEntryAdmin;

