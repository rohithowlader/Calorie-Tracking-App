import mongoose from "mongoose";



const userSchema = mongoose.Schema({
  uuid: {
    type: String,
    requied: true,
  },
  dateTimeTaken: {
    type: Date,
    requied: true,
  },
  product: {
    type: String,
    requied: true,
  },
  calorie: {
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