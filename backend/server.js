require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("");
const profileRoutes = require("");
const tradeRoutes = require("");
const requestRoutes = require("");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/request", requestRoutes);

const PORT =8000;
mongoose.connect("mongodb+srv://aashishkaaley:YyCw4HqACdDh3OWJ%40123@cluster0.yft23.mongodb.net/Suraj_test_3?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
