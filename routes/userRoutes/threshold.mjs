import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";

let threshold = express.Router();
let dateCal = (day, month, year) => {
    let cal = year * 10000 + month * 100 + day;
    return cal;

}

threshold.post('/', async (req, res) => {

    try {

        let { uuidUser, calorieLimit } = req.body;
        if(calorieLimit===undefined)
        calorieLimit=2100

        const UserFind = await Users.findOne({ uuidUser: uuidUser });

        if (!UserFind) {
            return res.status(404).json({ message: "Invalid user's uuid" })
        }
        const foodEntryFind = await foodEntry.find({ uuidUser: uuidUser });
        if (!foodEntryFind) {
            return res.status(404).json({ message: "Invalid entry" })
        }
        let dates = [];
        for (let i in foodEntryFind) {
            dates[i] = dateCal(foodEntryFind[i].dayTaken, foodEntryFind[i].monthTaken, foodEntryFind[i].yearTaken);
        }
        let uniqueDates = [...new Set(dates)];
        let calorieCrossedPerDay = [], count = 0;
        uniqueDates.sort((a, b)=> a - b);
        for (let i in uniqueDates) {
            let strDate = uniqueDates[i].toString();
            let dayTaken = parseInt(strDate.substring(6));
            let monthTaken = parseInt(strDate.substring(4, 6));
            let yearTaken = parseInt(strDate.substring(0, 4));
            
            const foodCalorieEntryFind = await foodEntry.find({ $and: [{ uuidUser: uuidUser }, { dayTaken }, { monthTaken }, { yearTaken }] });
            let sumCalorie = 0;
            for (let j in foodCalorieEntryFind) {
                sumCalorie = sumCalorie + foodCalorieEntryFind[j].calorie;
            }
            if (sumCalorie > calorieLimit ) {
                calorieCrossedPerDay[count] = `${dayTaken + "/" + monthTaken + "/" + yearTaken}`;
                count++;
            }


        }

        return res.status(200).json({
            messsage: `Details for ${UserFind.fname} on.  Calorie limit is breached on`,
            calorieCrossedPerDay

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default threshold;

