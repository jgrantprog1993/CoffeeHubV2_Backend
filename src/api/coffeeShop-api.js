import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import {imageStore} from "../models/image-store.js"
import { validationError } from "./logger.js";

export const coffeeShopApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
        return coffeeShops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
   
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
        if (!coffeeShop) {
          return Boom.notFound("No coffeeShop with this id");
        }
        return coffeeShop;
      } catch (err) {
        return Boom.serverUnavailable("No coffeeShop with this id");
      }
    },
   
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const loggedIUser = request.auth.credentials
      const newCoffeeShop = {
          coffeeShopName: request.payload.coffeeShopName,
          lat: Number(request.payload.lat),
          lng: Number(request.payload.lng),
          rating: Number(request.payload.rating),
          location: request.payload.location,
          user: loggedIUser,
          image: request.payload.image,
        };
        console.log(newCoffeeShop)
        try {
          await db.coffeeShopStore.addCoffeeShop(newCoffeeShop);
          return h.response().code(204);
        // return h.redirect(`/location/${location._id}`);
        } catch (err) {
          return Boom.serverUnavailable("Failed to AddCoffeeShop");
        }
      },
    
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {  
        await db.coffeeShopStore.deleteAllCoffeeShops();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CoffeeShopApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
        if (!coffeeShop) {
          return Boom.notFound("No CoffeeShop with this id");
        }
        await db.coffeeShopStore.deleteCoffeeShop(coffeeShop._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No CoffeeShop with this id");
      }
    },
  
  },

  uploadImage:{
    auth: 
    {
      strategy: "jwt",
    },
    handler: async function(request, h) 
    {
        try 
        {
          const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
          console.log(`CoffeeShop ->${  coffeeShop}`)
          console.log(`CoffeeShop._id ->${  coffeeShop._id}`)
          const url = await request.payload.url
          console.log(`Image file ->${  url}`)
          // coffeeShop.img = url;
          const success = await db.coffeeShopStore.updateCoffeeShop(coffeeShop._id, url);
          return h.response().code(204);
        }
        catch(err)
        {
          console.log(err);
          return Boom.serverUnavailable("Image Upload Error");
          
        }  
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },

  deleteImage:{
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
      console.log(`coffeeShop.img -> ${coffeeShop.img}`);
      console.log(`coffeeShop.id 1-> ${request.params.id}`);
      console.log(`coffeeShop.id 2-> ${coffeeShop._id}`);
      // eslint-disable-next-line prefer-template
      // console.log("request.payload.img ->" + request.payload);
      // await imageStore.deleteImage(request.payload.img);
      await db.coffeeShopStore.updateCoffeeShop(coffeeShop._id, "")
      console.log("Attempted to Delte Image");
      // coffeeShop.img = undefined;
      return h.response().code(204);
    }

  },

  getCoffeeShopsByUserId:{
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShops = await db.coffeeShopStore.getCoffeeShopsByUserId(request.params.id);
        return coffeeShops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
   
  },
};
