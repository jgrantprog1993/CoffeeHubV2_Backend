import Mongoose from "mongoose";

const { Schema } = Mongoose;

const coffeeShopSchema = new Schema({
  coffeeShopName: String,
  lat:Number,
  lng:Number,
  rating:Number,
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  img: String,
});

export const CoffeeShop = Mongoose.model("CoffeeShop", coffeeShopSchema);