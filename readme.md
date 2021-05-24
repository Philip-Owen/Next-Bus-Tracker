# Next Bus Tracker

This program uses the [Metro Transit NexTrip API](https://svc.metrotransit.org/nextrip) to return the next time a Metro Transit vehicle is set to leave a given stop.

## Usage

[Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are required to run this program.

To use this program clone this repository and change into the directory:

```
% git clone https://github.com/Philip-Owen/Next-Bus-Tracker.git
% cd Next-Bus-Tracker/
```

Install the dependencies with NPM:

```
% npm install
```

After the dependencies are installed you can run the program from the command line. You will need to specify a route name, a stop name, and a direction (north, south, east, west) like the example below:

```
% node nextbus.js "Route Name" "Stop Name" "Direction"
```

Here is an example of what the output would look like if you wanted to know the next departure time for the METRO Blue Line, from the MSP Airport Terminal 2 - Humphrey Station heading south:

```
% node nextbus.js "METRO Blue Line" "MSP Airport Terminal 2 - Humphrey Station" "south"
12 Min
```

The program will report errors if a parameter was not provided and if a route, stop, or direction was not found.
