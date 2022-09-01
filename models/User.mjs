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
    type: Number,
    requied: false,
  },
  uuidUser: {
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
  token: {
    type: String,
    requied:true,
  },
},{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;