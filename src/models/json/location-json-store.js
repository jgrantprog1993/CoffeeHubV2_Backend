import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { coffeeShopJsonStore } from "./coffeeShop-json-store.js";

const db = new Low(new JSONFile("./src/models/json/location.json"));
db.data = { locations: [] };

export const locationJsonStore = {
  async getAllLocation() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(location) {
    await db.read();
    location._id = v4();
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  async getLocationById(id) {
    let list = db.data.locations.find((location) => location._id === id);
    if (list) {
      list.coffeeShops = await coffeeShopJsonStore.getCoffeeShopsByLocationId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserLocation(userid) {
    await db.read();
    return db.data.locations.filter((location) => location.userid === userid);
  },

  async deleteLocationById(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    if (index !== -1) db.data.locations.splice(index, 1);
    await db.write();
  },

  async deleteAllLocation() {
    db.data.locations = [];
    await db.write();
  },
};