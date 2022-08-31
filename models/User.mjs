import mongoose from "mongoose";



const userSchema = mongoose.Schema({
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
  mobile: {
    type: number,
    requied: false,
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
const User = mongoose.model("User", userSchema);
export default User;