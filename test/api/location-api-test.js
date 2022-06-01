import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, fav1, testLocation, county, maggieCredentials } from "../fixtures.js"

const locations = new Array(testLocation.length)


suite("Location API tests", () => {

  let user = null;
  
    setup(async () => {
      placeMarkService.clearAuth();
      user = await placeMarkService.createUser(maggie);
      // console.log(user);
      await placeMarkService.authenticate(maggie);
      await placeMarkService.deleteAllLocation();
      await placeMarkService.deleteAllUsers();
      user = await placeMarkService.createUser(maggie);
      await placeMarkService.authenticate(maggieCredentials);
      county.userid = user._id;
    });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await placeMarkService.createLocation(county);
    // console.log(returnedLocation)
    assert.isNotNull(returnedLocation);
    assertSubset(county, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await placeMarkService.createLocation(county);
    const response = await placeMarkService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await placeMarkService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocation.length; i += 1) {
        testLocation[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await placeMarkService.createLocation(testLocation[i]);
      }
      let returnedLists = await placeMarkService.getAllLocation();
      assert.equal(returnedLists.length, testLocation.length);
      await placeMarkService.deleteAllLocation();
      returnedLists = await placeMarkService.getAllLocation();
      assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
        const response = await placeMarkService.deleteLocation("not an id");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
      }
  });
});