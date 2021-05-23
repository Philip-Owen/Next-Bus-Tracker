const { getRoutes, getDirection, getStop, getDeparture } = require("./helpers");

const [userRoute, userStop, userDirection] = process.argv.slice(2);

const getNextBus = async (route, stop, direction) => {
  if (route && stop && direction) {
    try {
      const routeId = await getRoutes(route);
      const directionCode = await getDirection(direction, routeId);
      const stopId = await getStop(stop, routeId, directionCode);
      const departureTime = await getDeparture(routeId, directionCode, stopId);

      console.log(departureTime);
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    console.log(
      "Missing parameter(s). Please enter a Route, Stop, and a Direction."
    );
    return;
  }
};

getNextBus(userRoute, userStop, userDirection);
