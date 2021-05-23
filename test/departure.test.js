const expect = require("chai").expect;
const nock = require("nock");

const response = require("./departure.mock");
const getDeparture = require("../nextbus").getDeparture;

describe("Testing departure", () => {
  nock("https://svc.metrotransit.org/NexTrip")
    .get("/901/0/28AV")
    .reply(200, response);

  it("Fetches Blue line departure", () => {
    return getDeparture("901", "0", "28AV").then((response) => {
      expect(response).to.have.property("DepartureText");
    });
  });
});
