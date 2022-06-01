import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  locationName: String,
  
});

export const Location = Mongoose.model("Location", locationSchema);