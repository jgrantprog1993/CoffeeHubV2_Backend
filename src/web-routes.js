import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  {method: "GET", path: "/user", config: accountsController.user },
  {method: "POST", path: "/editUser", config: accountsController.editLoggedInUser },
  
  
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/location/{id}", config: locationController.index },
  { method: "POST", path: "/location/{id}/addCoffeeShop", config: locationController.addCoffeeShop },

  { method: "GET", path: "/dashboard/deletelocation/{id}", config: dashboardController.deleteLocation },
  { method: "GET", path: "/location/{id}/deletecoffeeshop/{coffeeShopid}", config: locationController.deleteCoffeeShop },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  {method: "GET", path: "/admin-dashboard", config: adminController.index },
  {method: "GET", path: "/admin-dashboard/deleteusers/{id}", config: adminController.deleteUser },
  {method: "GET", path: "/admin-dashboard/deletecoffeeshop/{id}", config: adminController.deleteCoffeeShop },


  { method: "POST", path: "/coffeeShop/{id}/uploadimage", config: locationController.uploadImage },


];  