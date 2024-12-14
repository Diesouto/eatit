require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// API Imports
const connectDB = require("./config/db");
const loginRoutes = require("./routes/api/login");
const signinRoutes = require("./routes/api/signin");
const recipesRoutes = require("./routes/api/recipes");
const subscriptionRoutes = require("./routes/api/subscriptions");
const orderRoutes = require("./routes/api/orders");
const commentRoutes = require("./routes/api/comments");
const userRoutes = require("./routes/api/user");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/login", loginRoutes);
app.use("/api/signin", signinRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/user", userRoutes);

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
