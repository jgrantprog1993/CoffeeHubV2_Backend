import { userApi } from "./api/user-api.js"
import { locationApi } from "./api/location-api.js"
import { coffeeShopApi } from "./api/coffeeShop-api.js"

export const apiRoutes = [
  
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  // { method: "GET", path: "/api/users/reviews/{id}", config: userApi.findCoffeeShopsByUser },
  
  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "POST", path: "/api/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  
  { method: "GET", path: "/api/coffeeShop", config: coffeeShopApi.find },
  { method: "GET", path: "/api/coffeeShop/{id}", config: coffeeShopApi.findOne },
  { method: "POST", path: "/api/locations/{id}/coffeeShop", config: coffeeShopApi.create },
  { method: "DELETE", path: "/api/coffeeShop", config: coffeeShopApi.deleteAll },
  { method: "DELETE", path: "/api/coffeeShop/{id}", config: coffeeShopApi.deleteOne },
  { method: "POST", path: "/api/coffeeShop", config: coffeeShopApi.create },
  { method: "GET", path: "/api/coffeeShop/user/{id}", config: coffeeShopApi.getCoffeeShopsByUserId},

  { method: "POST", path: "/api/coffeeShop/{id}/addImage", config: coffeeShopApi.uploadImage },
  { method: "POST", path: "/api/coffeeShop/{id}/deleteImage", config: coffeeShopApi.deleteImage },

];