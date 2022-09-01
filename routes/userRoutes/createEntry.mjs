import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";

let createEntry = express.Router();

const leapYear = (year) => {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return 1;
    } else {
        return 0;
    }
}


createEntry.post('/', async (req, res) => {

    try {
        //The time is taken in 24 hour clock
        const { uuidUser, dayTaken, monthTaken, yearTaken, hourTaken, minuteTaken, product, calorie } = req.body;

        const UserFind = await Users.findOne({ uuid: uuidUser });
        //checking if user is present
        if (!UserFind) {
            return res.status(404).json({ message: "Invalid user's uuid" })
        }
        //checking if day is correct
        else if (dayTaken > 31 || dayTaken < 1) {
            return res.status(422).json({ message: "Invalid date entered" })
        }

        //checking if year when leap year is correct
        else if (leapYear(yearTaken) == 1 && monthTaken == 2) {
            if ((dayTaken > 29 || dayTaken < 1))
                return res.status(422).json({ message: `Invalid date entered in the month of ${monthTaken}. ${yearTaken} is a leap year and has only 29 days in ${monthTaken} month` })
        }

        //checking if year when not leap year is correct
        else if (leapYear(yearTaken) == 0 && monthTaken == 2) {
            if ((dayTaken > 28 || dayTaken < 1))
                return res.status(422).json({ message: `Invalid date entered. ${yearTaken} is not a leap year and has only 28 days in ${monthTaken} month` })
        }

        //checking if day in even month is correct
        else if ((monthTaken % 2 == 0 && monthTaken != 2) && dayTaken > 30) {
            return res.status(422).json({ message: `Invalid date entered. Has only 30 days in ${monthTaken} month` })
        }
        //checking if month is correct
        else if (monthTaken > 12 || monthTaken < 1) {
            return res.status(422).json({ message: `Invalid month entered.` })
        }
        //checking if hour is correct
        else if (hourTaken > 23 || hourTaken < 0) {
            return res.status(422).json({ message: `Invalid hour entered.` })
        }
        //checking if minute is correct
        else if (minuteTaken > 59 || minuteTaken < 0) {
            return res.status(422).json({ message: `Invalid minute entered.` })
        }
        
            let uuidEntryGenerate = uuidv4();

            const entry = new foodEntry({
                uuidUser,
                uuidEntry: uuidEntryGenerate,
                dayTaken,
                monthTaken,
                yearTaken,
                hourTaken,
                minuteTaken,
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

