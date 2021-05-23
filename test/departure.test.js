const expect = require("chai").expect;
const nock = require("nock");

const actual = require("./departure-actual.mock");
const estimated = require("./departure-estimated.mock");
const getDeparture = require("../nextbus").getDeparture;

describe("Testing departure actual", () => {
  nock("https://svc.metrotransit.org/NexTrip")
    .get("/901/0/28AV")
    .reply(200, actual);

  it("Fetches Blue line departure", () => {
    return getDeparture("901", "0", "28AV").then((response) => {
      expect(response).to.be.equal("3 Min");
    });
  });
});

describe("Testing departure estimated", () => {
  nock("https://svc.metrotransit.org/NexTrip")
    .get("/901/0/28AV")
    .reply(200, estimated);

  it("Fetches Blue line departure", () => {
    return getDeparture("901", "0", "28AV").then((response) => {
      expect(response).to.be.equal("Estimated departure 3:36");
    });
  });
});
