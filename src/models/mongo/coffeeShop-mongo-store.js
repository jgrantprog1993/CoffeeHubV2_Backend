import { CoffeeShop } from "./coffeeShop.js";

export const coffeeShopMongoStore = {
  async getAllCoffeeShops() {
    const coffeeShops = await CoffeeShop.find().populate("user").populate("location").lean();
    return coffeeShops;
  },

  async addCoffeeShop(coffeeShop) {
    const newCoffeeShop = new CoffeeShop(coffeeShop);
    const coffeeShopObj = await newCoffeeShop.save();
    return this.getCoffeeShopById(coffeeShopObj._id);
  },

  async getCoffeeShopsByLocationId(id) {
    const coffeeShops = await CoffeeShop.find({ locationid: id }).lean();
    return coffeeShops;
  },

  async getCoffeeShopById(id) {
    if (id) {
      const coffeeShop = await CoffeeShop.findOne({ _id: id }).populate("user").populate("location");
      return coffeeShop;
    }
    return null;
  },

  async getCoffeeShopsByUserId(id) {
    const coffeeShops = await CoffeeShop.find({ id: id }).lean();
    return coffeeShops;
  },

  async deleteCoffeeShop(id) {
    try {
      await CoffeeShop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCoffeeShops() {
    await CoffeeShop.deleteMany({});
  },

  async updateCoffeeShop(updatedCoffeeShopId, url) {
    const coffeeShop = await CoffeeShop.findOne({ _id: updatedCoffeeShopId });
    coffeeShop.img = url;
    await coffeeShop.save();
  },
};