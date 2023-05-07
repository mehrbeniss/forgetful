import { Tasks } from "pg";

const tasks = new Tasks({
  user: "postgres",
  host: "localhost",
  database: "mehr",
  password: "6693",
  port: 5432, // or your custom port number
});

(async () => {
  try {
    const { rows } = await tasks.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database:", rows[0]);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await tasks.end();
  }
})();

export default tasks;
