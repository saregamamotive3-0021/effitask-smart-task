import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";

const Form = () => {
    const MAX_TASKS = 500;
    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState(""); 

    const [startDate, setStartDate] = useState(null);
    const [EndDate, setEndDate] = useState(null);


    const addTask = () => {
        if (tasks.length >= MAX_TASKS) {
            alert(`You can only add up to ${MAX_TASKS} tasks.`);
            return;
        }

        if (input.trim() === "") {
            alert("Please enter a task");
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            text: input,
            priority: false,
            startDate: startDate,
            endDate: EndDate,
            saved: false,
        };

        setTasks([...tasks, newTask]);
        setInput("");
        setStartDate(null);
        setEndDate(null);
    };

    const colorChange = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === id) {
                    console.log(
                        "Changing task",
                        id,
                        "from",
                        task.priority,
                        "to",
                        !task.priority,
                    );

                    return {
                        ...task,
                        priority: !task.priority,
                    };
                }

                return task;
            });

            console.log("Updated Tasks:", updatedTasks);

            return updatedTasks;
        });
    };

    const cancelTask = (id) => {
        setTasks(tasks.filter((task) => task.id != id));
    };

    const saveTask = async (id) => {
        const task = tasks.find((t) => t.id === id);

        try {
            console.log("Saving task:", task);

            // Example backend call

            const response = await fetch("https://effitask-smart-task.onrender.com/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: task.text,
                    priority: task.priority,
                    startDate: task.startDate
                        ? task.startDate.toISOString().split("T")[0]
                        : null,
                    endDate: task.endDate
                        ? task.endDate.toISOString().split("T")[0]
                        : null,
                         userId: user?.id
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save");
            }

            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === id ? { ...t, saved: true } : t)),
            );

            alert("Task Saved Successfully");
        } catch (error) {
            console.error(error);
            alert("Error saving task");
        }
    };

    const startHandle = (date) => {
        setStartDate(date);
        if (EndDate && date > EndDate) {
            setEndDate(null);
        }
    };

    const EndHandle = (date) => {
        if (startDate && date < startDate) {
            alert("End date not allowed before start date");
            return;
        }

        setEndDate(date);
    };

    return (
        <div className="Tasks-Form">
            {/* ✅ Input field */}

            <div className="top-input">
                <h1 className="heading">Add Tasks</h1>

              <div className="input-box">
                <h2 className="sub-heading">Enter Tasks:</h2>
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="input1"
                />
               

                <div>
                    <label>Start Date: </label>
                    <DatePicker
                        selected={startDate}
                        onChange={startHandle}
                        selectsStart
                        startDate={startDate}
                        endDate={EndDate}
                        placeholderText="Select start date"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div>
                    <div>
                        <label>End Date: </label>
                        <DatePicker
                            selected={EndDate}
                            onChange={EndHandle}
                            selectsEnd
                            startDate={startDate}
                            endDate={EndDate}
                            minDate={startDate}
                            placeholderText="Select end date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                 </div>
                </div>

                <button
                    onClick={addTask}
                    disabled={tasks.length >= MAX_TASKS}
                    className="addTasks"
                >
                    Add Task
                </button>

                {/* ✅ Display tasks */}
                <ul className="task-priority">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div className="task-header">
                            <h3>{task.text}</h3>

                            {/* <p>Priority: {String(task.priority)}</p> */}
                            {/* <p className="startDate">
                                Start Date:{" "}
                                {task.startDate
                                    ? task.startDate.toLocaleDateString()
                                    : "Not Selected"}
                            </p>

                            <p className="endDate">
                                End Date:{" "}
                                {task.endDate
                                    ? task.endDate.toLocaleDateString()
                                    : "Not Selected"}
                            </p> */}

                            <div className="star">
                                <button
                                    className="StarPriority"
                                    type="button"
                                    onClick={() => colorChange(task.id)}
                                    style={{
                                        color: task.priority ? "gold" : "black",
                                        background: "none",
                                        border: "none",
                                        fontSize: "24px",
                                    }}
                                >
                                    ★
                                </button>
                                </div>
                            </div>

                            <button
                                onClick={() => saveTask(task.id)}
                                disabled={task.saved}
                                className="savetask"
                            >
                                {task.saved ? "Saved" : "Save"}
                            </button>

                            <button
                                className="cancelTask"
                                onClick={() => cancelTask(task.id)}
                            >
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Form;
