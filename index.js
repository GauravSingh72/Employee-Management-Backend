const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.port;

const authRoutes = require("./Routes/authRoute");
const employeeRoutes = require("./Routes/employeeRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Connected and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});
