const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Replace 'your-connection-string' with the actual connection string
// connection string: mongodb+srv://lionrhart:<password>@cluster1.w0fuscu.mongodb.net/
mongoose.connect(
  "mongodb+srv://lionrhart:ImhFUGjsWXXNwb9W@cluster1.w0fuscu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Could not connect to MongoDB: ${err}`);
});

// Define a schema for your tasks
const taskSchema = new mongoose.Schema({
  text: String,
  day: String,
  reminder: Boolean,
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "react-task-tracker", "build")));

// // GET /tasks/:id
// app.get("/tasks/:id", async (req, res) => {
//   const id = req.params.id;
//   // Fetch the task with this id from your db.json file
//   let data;
//   try {
//     data = JSON.parse(await fs.readFile("./db.json", "utf8"));
//   } catch (err) {
//     data = [];
//   }
//   const task = data.find((task) => task.id === Number(id));
//   res.json(task);
// });
// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  // Fetch the task with this id from your MongoDB database
  const task = await Task.findById(id);
  res.json(task);
});

// // POST /tasks
// app.post("/tasks", async (req, res) => {
//   const newTask = req.body;
//   // Add the new task to your db.json file
//   let data;
//   try {
//     data = JSON.parse(await fs.readFile("./db.json", "utf8"));
//   } catch (err) {
//     data = [];
//   }
//   data.push(newTask);
//   await fs.writeFile("./db.json", JSON.stringify(data));
//   res.json(newTask);
// });
// POST /tasks
app.post('/tasks', async (req, res) => {
  const newTask = req.body;
  // Add the new task to your MongoDB database
  const task = new Task(newTask);
  await task.save();
  res.json(task);
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
