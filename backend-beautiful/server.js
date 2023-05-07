import express from "express";
import tasks from "./postgres.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const app = express();
app.use(express.json()); // This middleware allows the server to parse JSON requests

app.get("/tasks", async (req, res) => {
  try {
    const { rows } = await tasks.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Internal server error");
  }
});

// Create an API endpoint to receive task data from the frontend and insert it into the database
app.post("/tasks", async (req, res) => {
  const { description, due_date } = req.body; // Assuming the frontend sends an object with description and due_date properties

  try {
    const result = await tasks.query(
      "INSERT INTO tasks (description, due_date) VALUES ($1, $2) RETURNING *",
      [description, due_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
