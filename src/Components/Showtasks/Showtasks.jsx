import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Showtasks.css";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setModal] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const [reminders, setReminders] = useState([]);

  const searchFunction = (e) => {
    const searchItem = e.target.value;
    setSearch(searchItem);
  };

  const openEditModal = (task) => {
    const fixDate = (date) => {
      if (!date) return null;

      // Handle MySQL DATE strings (YYYY-MM-DD) without timezone conversion
      if (typeof date === "string") {
        const [year, month, day] = date.split("-").map(Number);
        return new Date(year, month - 1, day);
      }

      return date instanceof Date ? date : new Date(date);
    };

    setEditTask({
      ...task,
      start_date: fixDate(task.start_date),
      end_date: fixDate(task.end_date),
    });

    setModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleStartDate = (date) => {
    setEditTask({
      ...editTask,
      start_date: date,
    });
  };

  const handleEndDate = (date) => {
    setEditTask({
      ...editTask,
      end_date: date,
    });
  };

  const formatDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const updateTask = async () => {
    try {
      console.log(editTask.start_date);
      console.log(editTask.end_date);
      console.log({
        task_name: editTask.task_name,
        priority: editTask.priority,
        start_date: formatDate(editTask.start_date),
        end_date: formatDate(editTask.end_date),
      });
      const response = await fetch(
        `https://effitask-smart-task.onrender.com/updateTask/${editTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_name: editTask.task_name,
            priority: editTask.priority,
            start_date: formatDate(editTask.start_date),
            end_date: formatDate(editTask.end_date),
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      setTasks(
        tasks.map((task) => (task.id === editTask.id ? editTask : task)),
      );

      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.task_name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);

    try {
      await fetch(
        `https://effitask-smart-task.onrender.com/updateStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        },
      );

      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      );

      setTasks(updatedTasks);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://effitask-smart-task.onrender.com/delete/${id}`,
        {
          method: "PUT",
        },
      );

      const data = await response.json();
      console.log(data);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`https://effitask-smart-task.onrender.com/tasks/${user.id}`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));

    fetch(`https://effitask-smart-task.onrender.com/reminders/${user.id}`)
      .then((response) => response.json())
      .then((data) => setReminders(data))
      .catch((error) => console.error(error));
  }, []);

  //New chart section

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  const chartData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const COLORS = ["#0F766E", "#9F1239"];

  return (
    <div className="showtasks">
      <h1 className="header1">Tasks Tracker</h1>

      <input
        type="text"
        value={search}
        placeholder="Search tasks here"
        onChange={searchFunction}
        className="input2"
      />

      {/* Reminder Section */}

      <div className="reminder-container">
        <h2>🔔 Upcoming Reminders</h2>

        {reminders.map((task) => {
          const days = Number(task.days_left); // ✅ correct place

          return (
            <div className="reminder-card" key={task.id}>
              <div>
                <strong>{task.task_name}</strong>
              </div>

              <div>
                {days === 0 && <span className="today">🔴 Due Today</span>}

                {days === 1 && (
                  <span className="tomorrow">🟠 Due Tomorrow</span>
                )}

                {days === 2 && (
                  <span className="twodays">🟡 Due in 2 Days</span>
                )}

                {days === 5 && (
                  <span className="fivedays">🟢 Due in 5 Days</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="content-wrapper">
        {/* TABLE */}
        <table className="tasks-table">
          <thead className="tHead">
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Importance</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Tasks Done</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>

                <td>{task.task_name}</td>

                <td>{task.priority ? "Important" : "Not Important"}</td>

                <td>
                  <button className="Edit" onClick={() => openEditModal(task)}>
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="delete2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => toggleTask(task.id)}
                    className="CheckBox"
                  />

                  {Boolean(Number(task.completed))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PIE CHART */}
        <div className="chart-container">
          <h3>Task Status</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showModal && editTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="EditTask">Edit Task</h2>

            <input
              type="text"
              name="task_name"
              value={editTask.task_name}
              onChange={handleEditChange}
              className="input_edit"
            />

            <div className="date-group">
              <label>Start Date</label>

              <DatePicker
                selected={editTask.start_date}
                onChange={handleStartDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="date-group">
              <label>End Date</label>

              <DatePicker
                selected={editTask.end_date}
                onChange={handleEndDate}
                minDate={editTask.start_date}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="modal-buttons">
              <button onClick={updateTask}>Save</button>

              <button onClick={() => setModal(false)} className="Modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTasks;
