// index.js
import express from "express";
import db from "./knexfile.js"; // adjust path if needed
import cors from "cors";
import router from "./routes/index.js";
const app = express();
const port = 3000;
import db2 from "./src/db.js";
// Run migrations on server start
(async () => {
  try {
    await db2.migrate.latest();
    console.log("✅ Migrations are up to date.");
  } catch (err) {
    console.error("❌ Failed to run migrations:", err);
    process.exit(1); // Optional: stop server if migrations fail
  }
})();

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
