import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";

let readEntry = express.Router();

readEntry.post('/', async (req, res) => {

    try {

        const { uuidUser,dayTaken, monthTaken, yearTaken } = req.body;

        const UserFind = await Users.findOne({ uuid: uuidUser });
        const foodEntryFind = await foodEntry.find({$and: [{ uuid: uuidUser}, {dayTaken},{monthTaken},{yearTaken} ]});
        console.log(foodEntryFind)

        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid user's uuid"})
        }
        if(!foodEntryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        let sumCalorie=0;
        for(let i in foodEntryFind)
        {
            sumCalorie=sumCalorie + foodEntryFind[i].calorie;
        }

        console.log("Calorie sum :" + sumCalorie)
        
        return res.status(200).json({
            messsage: `Details for ${UserFind.fname} on ${dayTaken}/${monthTaken}/${yearTaken}. Total Calorie Taken for the day is ${sumCalorie}`,
            foodEntryFind,

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default readEntry;

