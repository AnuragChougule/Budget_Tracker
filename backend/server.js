const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});