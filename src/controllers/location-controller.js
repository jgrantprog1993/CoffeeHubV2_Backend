import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  }, 

  addCoffeeShop: {
    
    validate: {
    
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        
        return h.view("location-view", { title: "Add CoffeeShop error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const location = await db.locationStore.getLocationById(request.params.id);
      const newCoffeeShop = {
        coffeeShopName: request.payload.coffeeShopName,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        rating: Number(request.payload.rating),
        user: loggedInUser,
      };
      await db.coffeeShopStore.addCoffeeShop(location._id, newCoffeeShop);
      // return h.redirect(`/location/${location._id}`);
    },
  },
  
  deleteCoffeeShop: {
   
    handler: async function(request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.coffeeShopStore.deleteCoffeeShop(request.params.coffeeShopid);
      return h.redirect(`/location/${location._id}`);
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          coffeeShop.img = url;
          db.coffeeShopStore.updateCoffeeShop(coffeeShop);
        }
        
      } catch (err) {
        console.log(err);
        
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};