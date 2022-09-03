import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";
import Admin from "../../models/admin.mjs"

let reportStats = express.Router();


reportStats.post('/', async (req, res) => {


    try {


        let { uuidUser, uuidAdmin } = req.body;

        //checking if admin is present
        const AdminFind = await Admin.findOne({ uuidAdmin: uuidAdmin });

        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }

        //checking if user is present
        const UserFind = await Users.findOne({ uuidUser: uuidUser });
        if (!UserFind) {
            return res.status(404).json({ message: "Invalid user's uuid" })
        }

        const foodEntryFind = await foodEntry.find({ uuidUser: uuidUser });
        if (!foodEntryFind) {
            return res.status(404).json({ message: "Invalid entry" })
        }
        const now = new Date();

        //last week
        let count = 0;
        let foodEntryWeek1 = [];
        let sumCalorieWeek1 = 0;
        for (let i = (now.getTime() - 7 * 24 * 60 * 60 * 1000); i < (now.getTime() + (1 * 24 * 60 * 60 * 1000)); i = i + (24 * 60 * 60 * 1000)) {
            let dayTaken = parseInt(new Date(i).getDate());
            let monthTaken = parseInt((new Date(i).getMonth() + 1));
            let yearTaken = parseInt(new Date(i).getFullYear());
            const foodCalorieEntryFindWeek1 = await foodEntry.find({ $and: [{ uuidUser: uuidUser }, { dayTaken }, { monthTaken }, { yearTaken }] });
            foodEntryWeek1[count++] = foodCalorieEntryFindWeek1;
            for (let j in foodCalorieEntryFindWeek1) {
                sumCalorieWeek1 = sumCalorieWeek1 + foodCalorieEntryFindWeek1[j].calorie;
            }
        }
        //week before last
        count = 0;
        let foodEntryWeek2 = [];
        let sumCalorieWeek2 = 0;
        for (let i = (now.getTime() - 15 * 24 * 60 * 60 * 1000); i <= (now.getTime() - (8 * 24 * 60 * 60 * 1000)); i = i + (24 * 60 * 60 * 1000)) {
            let dayTaken = parseInt(new Date(i).getDate());
            let monthTaken = parseInt((new Date(i).getMonth() + 1));
            let yearTaken = parseInt(new Date(i).getFullYear());
            const foodCalorieEntryFindWeek2 = await foodEntry.find({ $and: [{ uuidUser: uuidUser }, { dayTaken }, { monthTaken }, { yearTaken }] });
            foodEntryWeek2[count++] = foodCalorieEntryFindWeek2;
            for (let j in foodCalorieEntryFindWeek2) {
                sumCalorieWeek2 = sumCalorieWeek2 + foodCalorieEntryFindWeek2[j].calorie;
            }

        }
        //current day
        let sumCalorieToday=0;
        let dayTaken = parseInt(new Date().getDate());
        let monthTaken = parseInt((new Date().getMonth() + 1));
        let yearTaken = parseInt(new Date().getFullYear());
        const foodCalorieEntryFindToday = await foodEntry.find({ $and: [{ uuidUser: uuidUser }, { dayTaken }, { monthTaken }, { yearTaken }] });

        for (let j in foodCalorieEntryFindToday) {
            sumCalorieToday= sumCalorieToday + foodCalorieEntryFindToday[j].calorie;
        }




        return res.status(200).json({
            foodEntryWeek1,
            sumCalorieWeek1,
            foodEntryWeek2,
            sumCalorieWeek2,
            foodCalorieEntryFindToday,
            sumCalorieToday

        });


    }


    catch (e) {
        console.log(e);
    }

});

export default reportStats;

