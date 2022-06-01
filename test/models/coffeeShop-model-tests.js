import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocation, testCoffeeShops, county, fav1, fav2, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("CoffeeShop Model tests", () => {

  let countyList = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.coffeeShopStore.deleteAllCoffeeShops();
    countyList = await db.locationStore.addLocation(county);
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCoffeeShops[i] = await db.coffeeShopStore.addCoffeeShop(countyList._id, testCoffeeShops[i]);
    }
  });

  test("create single coffeeShop", async () => {
    const fav1List = await db.locationStore.addLocation(fav1);
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(fav1List._id, fav2)
    assert.isNotNull(coffeeShop._id);
    assertSubset (fav2, coffeeShop);
  });

  test("get multiple coffeeShops", async () => {
    const coffeeShops = await db.coffeeShopStore.getCoffeeShopsByLocationId(countyList._id);
    assert.equal(testCoffeeShops.length, testCoffeeShops.length)
  });

  test("delete all coffeeShops", async () => {
    const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(testCoffeeShops.length, coffeeShops.length);
    await db.coffeeShopStore.deleteAllCoffeeShops();
    const newCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(0, newCoffeeShops.length);
  });

  test("get a coffeeShop - success", async () => {
    const fav1List = await db.locationStore.addLocation(fav1);
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(fav1List._id, fav2)
    const newCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(coffeeShop._id);
    assertSubset (fav2, newCoffeeShop);
  });

  test("delete One CoffeeShop - success", async () => {
    
    // Think this is Wrong - Come back to LAter
    const id = testCoffeeShops[0]._id;
    console.log(id)
    await db.coffeeShopStore.deleteCoffeeShop(id);
    const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(coffeeShops.length, testCoffeeShops.length - 1);
    const deletedCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(id);
    // console.log(deletedCoffeeShop)
    assert.isNull(deletedCoffeeShop);
    
  });


});