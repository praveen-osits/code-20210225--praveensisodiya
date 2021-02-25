# Ingest CSV or Excel File
## Requirements
Write a node script using Typescript to read [this CSV file](https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv). Automate the setup, build, test, package and run using your favourite tools.

## Technical Specification
1. The code should be well tested and production quality code
2. Print the summarized output describing the following meta data about the CSV
a. Column or field names present in the CSV
b. Total size in bytes of the file
c. Total number of rows

## Installation, Building and Running the app

This app requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

To build the app
```sh
npm run build
```

To build and run the app
```sh
npm run build+run
```

Running the unit tests
```sh
node run test
```

To See code coverage
```sh
node run test:coverage
```