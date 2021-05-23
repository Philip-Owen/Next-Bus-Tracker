const { getRoutes, getDirection, getStop, getDeparture } = require("./helpers");

const [userRoute, userStop, userDirection] = process.argv.slice(2);

const getNextBus = async (route, stop, direction) => {
  const routeId = await getRoutes(route);
  const directionCode = await getDirection(direction, routeId);
  const stopId = await getStop(stop, routeId, directionCode);
  const departureTime = await getDeparture(routeId, directionCode, stopId);

  console.log(departureTime);
};

getNextBus(userRoute, userStop, userDirection);
