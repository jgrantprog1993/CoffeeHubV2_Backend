import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placeMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  },
  async getUser(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try{
      const res = await axios.get(`${this.placeMarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },
  async createLocation(location) {
    const res = await axios.post(`${this.placeMarkUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocation() {
    const response = await axios.delete(`${this.placeMarkUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.placeMarkUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocation() {
    const res = await axios.get(`${this.placeMarkUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placeMarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async getAllCoffeeShops() {
    const res = await axios.get(`${this.placeMarkUrl}/api/coffeeShop`);
    return res.data;
  },

  async createCoffeeShop(id, coffeeShop) {
    const res = await axios.post(`${this.placeMarkUrl}/api/locations/${id}/coffeeShop`, coffeeShop);
    return res.data;
  },

  async getCoffeeShop(id) {
    try {
      const res = await axios.get(`${this.placeMarkUrl}/api/coffeeShop/${id}`);
      return res.data;
    } catch (error) {
      console.log("no such id");
      return null;
    }
  },

  async deleteCoffeeShop(id) {
    try {
      await axios.delete(`${this.placeMarkUrl}/api/coffeeShop/${id}`);
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCoffeeShops() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/coffeeShop`);
    return res.data;
  },

  async updateCoffeeShop(coffeeShop, updatedCoffeeShop) {
    coffeeShop.coffeeShopName = updatedCoffeeShop.coffeeShopName;
    coffeeShop.lat = updatedCoffeeShop.lat;
    coffeeShop.lng = updatedCoffeeShop.lng;
    coffeeShop.description = updatedCoffeeShop.description;
    await axios.put(`${this.placeMarkUrl}/api/coffeeShop`);
  },
};