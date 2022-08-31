import mongoose from "mongoose";



const adminSchema = mongoose.Schema({
  fname: {
    type: String,
    requied: true,
  },
  lname: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    requied: true,
  },
  uuid: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});
const Admin = mongoose.model("Admin", userSchema);
export default Admin;