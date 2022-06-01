import { db } from "../models/db.js";
// import { user } from "../models/mongo/user-mongo-store.js"

export const adminController = {
  
  index: {
    plugins: {
      hacli: {
        permissions: ["ADMIN"],
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const locations = await db.locationStore.getAllLocations();
      const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
      
      
      const viewData = {
        title: "CoffeeHub Admin Dashboard",
        users: users,
        user: loggedInUser,
        locations: locations,
        coffeeShops: coffeeShops,
        permissions: users.permissions,
        // usersByID: usersByID,        
      };
      return h.view("admin-dashboard", viewData);
    },
  },

  deleteUser:{
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      console.log(`Got user - ${  user.firstName}`)
      await db.userStore.deleteUserById(user);
      console.log(`Attemped to delete - ${  user}`)
      return h.redirect("/admin-dashboard");
    },
  },

  deleteCoffeeShop:{
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id)
      console.log(`Got coffeeshop - ${  coffeeShop}`)
      await db.coffeeShopStore.deleteCoffeeShop(coffeeShop)
      console.log(`Attemped to delete - ${  coffeeShop}`)
      return h.redirect("/admin-dashboard");
    },
  }
};
