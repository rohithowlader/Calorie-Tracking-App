import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";
import Admin from "../../models/admin.mjs"

let readEntryAdmin = express.Router();
let dateCal = (day, month, year) => {
    let cal = year * 10000 + month * 100 + day;
    return cal;

} 

readEntryAdmin.post('/', async (req, res) => {

    try {

        let { uuidUser, uuidAdmin } = req.body;

        //checking if admin is present
        const AdminFind = await Admin.findOne({ uuidAdmin: uuidAdmin });
        
        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }

        //checking if user is present
        const UserFind = await Users.findOne({ uuidUser: uuidUser });
        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid user's uuid"})
        }

        const foodEntryFind = await foodEntry.find({ uuidUser: uuidUser});
        if(!foodEntryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        let dates = [];
        for (let i in foodEntryFind) {
            dates[i] = dateCal(foodEntryFind[i].dayTaken, foodEntryFind[i].monthTaken, foodEntryFind[i].yearTaken);
        }
        let uniqueDates = [...new Set(dates)];
        let foodCalorieEntryFind=[];
        let count=0;
        uniqueDates.sort((a, b)=> a - b);
        for (let i in uniqueDates) {
            let strDate = uniqueDates[i].toString();
            let dayTaken = parseInt(strDate.substring(6));
            let monthTaken = parseInt(strDate.substring(4, 6));
            let yearTaken = parseInt(strDate.substring(0, 4));
            foodCalorieEntryFind[count++] = await foodEntry.find({ $and: [{ uuidUser: uuidUser }, { dayTaken }, { monthTaken }, { yearTaken }] });
            


        }
        
        return res.status(200).json({
            messsage: `Details for ${UserFind.fname} `,
            foodCalorieEntryFind

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default readEntryAdmin;

