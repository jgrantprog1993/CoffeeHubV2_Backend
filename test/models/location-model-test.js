import { assert } from "chai";
import { db } from "../../src/models/db.js"
import { testLocation, county } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    for (let i = 0; i < testLocation.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocation[i] = await db.locationStore.addLocation(testLocation[i]);
    }
  });

  test("create a Location", async () => {
    const location = await db.locationStore.addLocation(county);
    assertSubset(county, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedLocation = await db.locationStore.getAllLocations();
    assertSubset(returnedLocation.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedLocation = await db.locationStore.getAllLocations();
    assertSubset(returnedLocation.length, 0);
  });

  test("get a Location - success", async () => {
    const location = await db.locationStore.addLocation(county);
    const returnedLocation = await db.locationStore.getLocationById(location._id);
    assertSubset(county, location);
  });

  test("delete One Location - success", async () => {
    const id = testLocation[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedLocation = await db.locationStore.getAllLocations();
    assertSubset(returnedLocation.length, testLocation.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedLocation);
  });

  test("get a Location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One Location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const allLocation = await db.locationStore.getAllLocations();
    assertSubset(testLocation.length, allLocation.length);
  });
});