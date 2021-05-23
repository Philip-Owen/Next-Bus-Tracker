const expect = require("chai").expect;
const nock = require("nock");

const response = require("./direction.mock");
const getDirection = require("../nextbus").getDirection;

describe("Testing direction", () => {
  nock("http://svc.metrotransit.org/NexTrip")
    .get("/Directions/901")
    .reply(200, response);

  it("Fetches Blue line directions", () => {
    return getDirection("north").then((response) => {
      expect(response).to.equal("0");
    });
  });
});
