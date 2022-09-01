import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";

let createEntry = express.Router();

createEntry.post('/', async (req, res) => {

    try {

        const { uuidUser, dateTimeTaken, product, calorie } = req.body;

        const UserFind = await Users.findOne({ uuid: uuidUser });
        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid uuid"})
        }

        let uuidEntryGenerate = uuidv4();

        const entry = new foodEntry({
            uuidUser,
            uuidEntry:uuidEntryGenerate,
            dateTimeTaken,
            product,
            calorie,
            date: Date.now()
        })
        const response = await entry.save();
        return res.status(200).json({
            messsage: `Entry for ${product} Created`
        });
    }


    catch (e) {
        console.log(e);
    }
});

export default createEntry;

