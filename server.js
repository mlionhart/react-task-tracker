const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "react-task-tracker", "build")));

// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  // Fetch the task with this id from your db.json file
  const data = JSON.parse(await fs.readFile("./db.json", "utf8"));
  const task = data.find((task) => task.id === Number(id));
  res.json(task);
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  const newTask = req.body;
  // Add the new task to your db.json file
  const data = JSON.parse(await fs.readFile("./db.json", "utf8"));
  data.push(newTask);
  await fs.writeFile("./db.json", JSON.stringify(data));
  res.json(newTask);
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
