import bcrypt from "bcrypt";          // ADDED
import { db } from "../models/db.js";

import { userMongoStore } from "../models/mongo/user-mongo-store.js";
        

const saltRounds = 10;                // ADDED

// Handlebars.registerHelper('ifeq', function(a, b, opts) {
//  if(a == b) // Or === depending on your needs
 //     return opts.fn(this);
 // else
 //     return opts.inverse(this); }); 


export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to CoffeeHub" });
    },
  },
  
  
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for CoffeeHub" });
    },
  },
  signup: {
    auth: false,
    validate: {
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);    // ADDED
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to CoffeeHub" });
    },
  },
  login: {
    auth: false,
    validate: {
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);    // ADDED
      if (!user || !passwordsMatch) {                                           // EDITED
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  user: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "User Credentials",
        user: user,
      };
      return h.view("userCredentials-view", viewData);
    },
  },
// updateuserCred
  editLoggedInUser: {
    validate: {
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("userCredentials-view", { title: "Error", errors: error.details }).takeover.code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newUserCredentials = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      try {
        await db.userStore.updateUserCredentials(loggedInUser._id, newUserCredentials);
      } catch (error) {
        console.log(error);
      }
      return h.view("login-view");
    },
  },
  
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user, permissions: user.permission};
  },
};
