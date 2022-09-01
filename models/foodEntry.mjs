import mongoose from "mongoose";



const foodEntrySchema = mongoose.Schema({
  uuidUser: {
    type: String,
    requied: true,
  },
  uuidEntry: {
    type: String,
    requied: true,
  },
  dayTaken: {
    type: Number,
    requied: true,
  },
  monthTaken: {
    type: Number,
    requied: true,
  },
  yearTaken: {
    type: Number,
    requied: true,
  },
  hourTaken: {
    type: Number,
    requied: true,
  },
  minuteTaken: {
    type: Number,
    requied: true,
  },
  product: {
    type: String,
    requied: true,
  },
  calorie: {
    type: Number,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});
const foodEntry = mongoose.model("FoodEntry", foodEntrySchema);
export default foodEntry;