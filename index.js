// index.js
import express from "express";
import db from "./knexfile.js"; // adjust path if needed
import cors from "cors";
import router from "./routes/index.js";
const app = express();
const port = 3000;

// Example route using Knex
app.get("/", async (req, res) => {
  try {
    const result = await db
      .withSchema("salesordersexample")
      .from("products")
      .select("*");

    res.json(result);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
});

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
