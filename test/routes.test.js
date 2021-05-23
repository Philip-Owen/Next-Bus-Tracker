const expect = require("chai").expect;
const nock = require("nock");

const response = require("./routes.mock");
const getRoutes = require("../nextbus").getRoutes;

describe("Testing route", () => {
  nock("https://svc.metrotransit.org/NexTrip")
    .get("/Routes")
    .reply(200, response);

  it("Fetches Blue line info", () => {
    return getRoutes("METRO Blue Line").then((response) => {
      expect(response).to.equal("901");
    });
  });
});
