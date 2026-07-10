const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt= require("bcrypt");
const fs= require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync("./ca.pem"),
    },
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.post("/addTask", (req, res) => {
    console.log("BODY:", req.body);

    const { text, priority, startDate, endDate, userId } = req.body;

    const sql = `
        INSERT INTO TASKS
        (task_name, priority, start_date, end_date, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [text, priority, startDate, endDate, userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to save task",
                });
            }

            res.status(200).json({
                message: "Task saved successfully",
                id: result.insertId,
            });
        },
    );
});

app.get("/tasks/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = `
        SELECT
            id,
            task_name,
            priority,
            DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
            DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
            completed,
            is_deleted,
            user_id
        FROM TASKS
        WHERE user_id = ?
        AND is_deleted = FALSE
    `;

    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error fetching tasks",
            });
        }

        res.json(result);
    });
});

app.get("/tasks", (req, res) => {
    const sql = `
        SELECT
            id,
            task_name,
            priority,
            DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
            DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
            completed,
            is_deleted,
            user_id
        FROM TASKS
        WHERE is_deleted = FALSE
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error fetching tasks",
            });
        }

        res.json(result);
    });
});

app.put("/delete/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE TASKS
        SET is_deleted = TRUE
        WHERE id = ?
    `;

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error deleting task",
            });
        }

        res.json({
            message: "Task deleted successfully",
        });
    });
});

//Login
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Email validation
    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|rediffmail\.com)$/i;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Enter appropriate mail"
        });
    }

    // Password validation (NEW)
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password must be at least 8 characters long and include letters, numbers, and a special character"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO LOGIN (name, email, password) VALUES (?, ?, ?)";

        connection.query(sql, [name, email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "User registered successfully"
            });
        });
    } catch (err) {
        res.status(500).json({
            message: "Hashing error"
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM LOGIN WHERE email = ?";

    connection.query(sql, [email], async (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Database error" });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }

        return res.json({
            success: true,
            user,
        });
    });
});

app.put("/updateStatus/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const sql = "UPDATE TASKS SET completed = ? WHERE id = ?";

    connection.query(sql, [completed, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Status updated successfully",
        });
    });
});

app.get("/reminders/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `
SELECT 
    id,
    task_name,
    end_date,
    DATEDIFF(CAST(end_date AS DATE), CURDATE()) AS days_left
FROM TASKS
WHERE user_id = ?
  AND completed = FALSE
  AND is_deleted = FALSE
  AND DATEDIFF(CAST(end_date AS DATE), CURDATE()) BETWEEN 0 AND 5
ORDER BY end_date ASC;
`;
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// app.put("/updateTask/:id", (req, res) => {
//     const { id } = req.params;
//     const { task_name, priority } = req.body;

//     const sql = `
//         UPDATE TASKS
//         SET task_name = ?, priority = ?
//         WHERE id = ?
//     `;

//     connection.query(
//         sql,
//         [task_name, priority, id],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     message: "Error updating task"
//                 });
//             }

//             res.json({
//                 message: "Task updated successfully"
//             });
//         }
//     );
// });

app.put("/updateTask/:id", (req, res) => {
    const { id } = req.params;

    const { task_name, priority, start_date, end_date } = req.body;

    const sql = `
        UPDATE TASKS
        SET task_name = ?,
            priority = ?,
            start_date = ?,
            end_date = ?
        WHERE id = ?`;

    console.log(task_name, priority, start_date, end_date, id);

    connection.query(
        sql,
        [task_name, priority, start_date, end_date, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Task updated successfully",
            });
        },
    );
});

connection.connect((err) => {
    if (err) {
        console.error(" Database connection failed:", err);
        process.exit(1);
    }

    console.log("Connected to MySQL database successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});