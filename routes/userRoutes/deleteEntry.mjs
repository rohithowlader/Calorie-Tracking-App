import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";

let deleteEntry = express.Router();

deleteEntry.post('/', async (req, res) => {

    try {

        const { uuidUser, uuidEntry} = req.body;

        const UserFind = await Users.findOne({uuidUser: uuidUser });
        const foodEntryFind = await foodEntry.findOne({$and: [{ uuidUser: uuidUser},{uuidEntry: uuidEntry } ]});
        

        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid user's uuid"})
        }
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

export default deleteEntry;

