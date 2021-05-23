const fetch = require("node-fetch");

// API Call handler
const apiFetch = async (endpoint) => {
  const res = await fetch(`https://svc.metrotransit.org/NexTrip/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await res.json();
};

// Get routes and filter object to find route specified in args
// Return Route ID
const getRoutes = async (route) => {
  const data = await apiFetch("Routes");
  const routeId = data.filter((r) => r.Description === route);

  if (routeId.length > 0) {
    return routeId[0].Route;
  } else {
    throw new Error(`No route with name '${route}' found.`);
  }
};
// Get a routes directions by specifying the route ID and filter based on direction specified in args
// Return direction value
const getDirection = async (direction, routeId) => {
  const data = await apiFetch(`Directions/${routeId}`);
  const routeDirection = data.filter((d) =>
    d.Text.toLowerCase().includes(direction.toLowerCase())
  );

  if (routeDirection.length > 0) {
    return routeDirection[0].Value;
  } else {
    throw new Error(`No direction '${direction}' found.`);
  }
};

// Get route stops by specifying route ID + direction and filter and filter based on stop specified in args
// Return Stop value
const getStop = async (stopName, routeId, direction) => {
  const data = await apiFetch(`Stops/${routeId}/${direction}`);
  const routeStop = data.filter(
    (s) => s.Text.toLowerCase() === stopName.toLowerCase()
  );

  if (routeStop.length > 0) {
    return routeStop[0].Value;
  } else {
    throw new Error(`No stop with name '${stopName}' found.`);
  }
};

// Get departure details by specifying route ID + direction + stop
// Return DepartureText from first object in array
const getDeparture = async (routeId, direction, stopId) => {
  const data = await apiFetch(`${routeId}/${direction}/${stopId}`);

  if (data.length > 0) {
    if (data[0].Actual) {
      return data[0].DepartureText;
    } else {
      return `Estimated departure ${data[0].DepartureText}`;
    }
  } else {
    throw new Error(`No more departure times from this stop.`);
  }
};

module.exports = { getRoutes, getDirection, getStop, getDeparture };
