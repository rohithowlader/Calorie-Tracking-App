import express from 'express';
import Users from "../../models/User.mjs";
import foodEntry from "../../models/foodEntry.mjs";
import Admin from "../../models/admin.mjs"

let updateEntryAdmin = express.Router();

const leapYear = (year) => {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return 1;
    } else {
        return 0;
    }
}
updateEntryAdmin.post('/', async (req, res) => {

    try {

        //The time is taken in 24 hour clock
        let { uuidUser,uuidAdmin, uuidEntry, dayTaken, monthTaken, yearTaken, hourTaken, minuteTaken, product, calorie } = req.body;


        const AdminFind = await Admin.findOne({ uuidAdmin: uuidAdmin });
        
        if (!AdminFind) {
            return res.status(404).json({ message: "Invalid admin's uuid" })
        }


        const UserFind = await Users.findOne({ uuidUser: uuidUser });
        
        if(!UserFind)
        {
            return res.status(404).json({message:"Invalid user's uuid"})
        }

        const foodEntryFind = await foodEntry.findOne({ uuidEntry: uuidEntry});

        if(!foodEntryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
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




        const filter = { uuidEntry: uuidEntry };
            const update = {
                dayTaken, monthTaken, yearTaken, hourTaken, minuteTaken, product, calorie
            };

            let doc = await foodEntry.findOneAndUpdate(filter, update);

        
        
        return res.status(200).json({
            messsage: `Updated entry`,

        });
    }


    catch (e) {
        console.log(e);
    }

});

export default updateEntryAdmin;

