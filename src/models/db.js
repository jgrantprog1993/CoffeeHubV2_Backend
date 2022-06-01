import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { coffeeShopMongoStore } from "./mongo/coffeeShop-mongo-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  coffeeShopStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.coffeeShopStore = coffeeShopMongoStore;
        connectMongo();
        break;
      default:
    }
  }
}; 

