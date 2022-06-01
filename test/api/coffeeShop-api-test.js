import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placeMarkService } from "./placemark-service.js";
import { maggie, fav1, testLocation, testCoffeeShops, fav2, maggieCredentials,testCoffeeShop1, testCoffeeShop2} from "../fixtures.js"

suite("CoffeeShop API tests", () => {
  let user = null;
  let waterfordCoffeeShops = null;

  setup(async () => {
    // await placeMarkService.clearAuth();
   placeMarkService.deleteAllLocation();
   placeMarkService.deleteAllCoffeeShops();
   // await placeMarkService.deleteAllUsers();
    
    user = await placeMarkService.createUser(maggie);
    await  placeMarkService.authenticate(maggie);
    fav1.userid = user._id;
    waterfordCoffeeShops = await placeMarkService.createLocation(fav1);
  });

  teardown(async () => {});

  test("create coffeeShop", async () => {
    const returnedCoffeeShop = await placeMarkService.createCoffeeShop(waterfordCoffeeShops._id, testCoffeeShop2);
    console.log(returnedCoffeeShop)
    assertSubset(fav2, returnedCoffeeShop);
  });

  test("create Multiple coffeeShops", async () => {
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createCoffeeShop(waterfordCoffeeShops._id, testCoffeeShops[i]);
    }
    const returnedCoffeeShops = await placeMarkService.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, testCoffeeShops.length);
    for (let i = 0; i < returnedCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const coffeeShop = await placeMarkService.getCoffeeShop(returnedCoffeeShops[i]._id);
      assertSubset(coffeeShop, returnedCoffeeShops[i]);
    }
  });

  test("Delete CoffeeShopApi", async () => {
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createCoffeeShop(waterfordCoffeeShops._id, testCoffeeShops[i]);
    }
    let returnedCoffeeShops = await placeMarkService.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, testCoffeeShops.length);
    for (let i = 0; i < returnedCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const coffeeShop = await placeMarkService.deleteCoffeeShop(returnedCoffeeShops[i]._id);
    }
    returnedCoffeeShops = await placeMarkService.getAllCoffeeShops();
    assert.equal(returnedCoffeeShops.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createCoffeeShop(waterfordCoffeeShops._id, testCoffeeShops[i]);
    }
    const returnedLocation = await placeMarkService.getLocation(waterfordCoffeeShops._id);
    assert.equal(returnedLocation.coffeeShops.length, testCoffeeShops.length);
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      assertSubset(testCoffeeShops[i], returnedLocation.coffeeShops[i]);
    }
  });
});