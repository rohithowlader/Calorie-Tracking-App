import mongoose from "mongoose";



const foodEntrySchema = mongoose.Schema({
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