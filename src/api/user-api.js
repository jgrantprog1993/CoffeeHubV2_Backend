import Boom from "@hapi/boom";
import bcrypt from "bcrypt";          // ADDED
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";

 const saltRounds = 10;                // ADDED

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const { email, password } = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        const passwordsMatch = await bcrypt.compare(password, user.password);    // ADDED
        if (!user || !passwordsMatch) {
          return Boom.unauthorized("User not found");
        }  
       
        const token = createToken(user);
        request.cookieAuth.set({ id: user._id });
        return h.response({ success: true, token: token }).code(201);
        
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    },
  

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = request.payload
        user.password = await bcrypt.hash(user.password, saltRounds);
        const success = await db.userStore.addUser(user);
        // const user = await db.userStore.addUser(request.payload);
        if (success) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

  },

  findCoffeeShopsByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopsByUserId(request.params.id);
        console.log(coffeeShop)
        return user;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

  },
};