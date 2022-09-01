import express from 'express';
import connectDB from './config/db.mjs';
import createUser from "./routes/createUser.mjs";
import createAdmin from "./routes/createAdmin.mjs";
import loginUser from "./routes/loginUser.mjs";
import auth from "./middleware/auth.mjs";


connectDB();
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Routing
app.use('/createUser', createUser);
app.use('/createAdmin', createAdmin);
app.use('/loginUser',   loginUser);



//Index page
app.get('/',auth,(req,res)=>{
    res.send('Index Page');
});

//Server Setup
const PORT= process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`);
})