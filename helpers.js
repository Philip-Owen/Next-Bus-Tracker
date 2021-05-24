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

// Gets all routes from /Routes endpoint and filters array based on route input.
// Returns the route ID as a string.
// Throws an error if the array is empty.
const getRoutes = async (route) => {
  const data = await apiFetch("Routes");
  const routeId = data.filter((r) => r.Description === route);

  if (routeId.length > 0) {
    return routeId[0].Route;
  } else {
    throw new Error(`No route with name '${route}' found.`);
  }
};

// Uses routeId from getRoutes() function to retrieve the routes directions from the
// /Directions/(routeId) endpoint and filters array based on the direction input.
// Returns the direction code as a string.
// Throws an error if the array is empty.
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

// Uses the routeId and direction to retrieve a list of stops for a given route using the
// /Stops/(routeId)/(direction) endpoint and filters array based on stopName input.
// Returns the stop ID as a string.
// Throws an error if the array is empty.
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

// Uses return values from getRoutes(), getDirection(), and getStop() to retrieve a list
// of departure times for a specified route, direction, and stop.
// Uses the first object in the array
// If the 'Actual' property is set to true, the program logs the 'DepartureText' property
// to the console.
// If the 'Actual' property is set to false, the program logs that the next departure time
// is an estimate and includes the estimated time of the next departure in the xx:xx format.
// Throws an error if the array is empty.
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
