// src/App.js Represents the main UI of your application. I.e. the primary component of your application. Why? React is component-based. Think of components as self-contained units that manage their own UI and logic. The App component is the primary component where you can embed other smaller components to build your app's interface.

// The beauty of this structure is the ability to reuse components across different parts of your application.

import { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

function App() {
  // Adding another piece of state
  const [showAddTask, setShowAddTask] = useState(false);

  // using useState hook to set an initial array of tasks. tasks is a piece of state, managed using the useState hook.
  const [tasks, setTasks] = useState([]);

  // useEffect
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(
      "https://frozen-river-11954-4fdc380c8747.herokuapp.com/tasks"
    );
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);

    return data;
  };

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(
      `https://frozen-river-11954-4fdc380c8747.herokuapp.com/tasks/${id}`
    );
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);


    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(
      "https://frozen-river-11954-4fdc380c8747.herokuapp.com/tasks",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    console.log(`Status: ${res.status}`);
    console.log(`Status Text: ${res.statusText}`);

    if (!res.ok) {
      throw new Error(`An error occurred: ${res.status}`);
    }

    // data is just new task that's added. Need await because it returns a promise
    const data = await res.json();

    // add data (new task just created) to tasks array
    setTasks([...tasks, data]);

    // original code, before adding above json-server functionality
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(
      `https://frozen-river-11954-4fdc380c8747.herokuapp.com/tasks/${id}/`,
      {
        method: "DELETE",
      }
    );

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(
      `https://frozen-river-11954-4fdc380c8747.herokuapp.com/tasks/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      }
    );

    // data is updated task
    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router basename="/react-task-tracker">
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
