import express from 'express';
import connectDB from './config/db.mjs';
import createUser from "./routes/createUser.mjs";
import createAdmin from "./routes/createAdmin.mjs";
import loginUser from "./routes/loginUser.mjs";
import loginAdmin from "./routes/loginAdmin.mjs";
import authUser from "./middleware/authUser.mjs";
import authAdmin from "./middleware/authAdmin.mjs";
import createEntry from "./routes/userRoutes/createEntry.mjs";
import readEntry from "./routes/userRoutes/readEntry.mjs";
import updateEntry from "./routes/userRoutes/updateEntry.mjs";
import deleteEntry from "./routes/userRoutes/deleteEntry.mjs";
import threshold from "./routes/userRoutes/threshold.mjs";


connectDB();
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Routing
app.use('/createUser', createUser);
app.use('/createAdmin', createAdmin);
app.use('/loginUser',   loginUser);
app.use('/loginAdmin',   loginAdmin);
app.use('/createEntry', authUser,  createEntry);
app.use('/readEntry', authUser,  readEntry);
app.use('/updateEntry', authUser,  updateEntry);
app.use('/deleteEntry', authUser,  deleteEntry);
app.use('/threshold', authUser,  threshold);



//Index page
app.get('/',authAdmin,(req,res)=>{
    res.send('Index Page');
});

//Server Setup
const PORT= process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`);
})