// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize express application
const app = express();

// Use body-parser middleware to handle JSON requests
app.use(bodyParser.json());

// Use cors middleware to handle CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "react-task-tracker", "build")));

// Define a route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "react-task-tracker", "build", "index.html")
  );
});

// Start the server on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
