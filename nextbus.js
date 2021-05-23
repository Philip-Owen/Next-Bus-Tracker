const fetch = require("node-fetch");

// Destructure Route, Stop, Direction from process.argv

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
  return routeId[0].Route;
};
// Get a routes directions by specifying the route ID and filter based on direction specified in args
// Return direction value
const getDirection = async (direction, routeId) => {
  const data = await apiFetch(`Directions/${routeId}`);
  const routeDirection = data.filter((d) =>
    d.Text.toLowerCase().includes(direction.toLowerCase())
  );
  return routeDirection[0].Value;
};

// Get route stops by specifying route ID + direction and filter and filter based on stop specified in args
// Return Stop value
const getStop = async (stopName, routeId, direction) => {
  const data = await apiFetch(`Stops/${routeId}/${direction}`);
  const routeStop = data.filter(
    (s) => s.Text.toLowerCase() === stopName.toLowerCase()
  );
  return routeStop[0].Value;
};

// Get departure details by specifying route ID + direction + stop
// Return DepartureText from first object in array

module.exports = { getRoutes, getDirection, getStop };
