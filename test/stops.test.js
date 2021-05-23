const expect = require("chai").expect;
const nock = require("nock");

const response = require("./stops.mock");
const getStop = require("../nextbus").getStop;

describe("Testing stops", () => {
  nock("https://svc.metrotransit.org/NexTrip")
    .get("/Stops/901/0")
    .reply(200, response);

  it("Fetches Blue line stops", () => {
    return getStop("28th Ave Station", "901", "0").then((response) => {
      expect(response).to.equal("28AV");
    });
  });
});
