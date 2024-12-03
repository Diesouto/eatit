require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const loginRoute = require("./routes/api/login");
const signinRoute = require("./routes/api/signin");
const recipesRoute = require("./routes/api/recipes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/login", loginRoute);
app.use("/api/signin", signinRoute);
app.use("/api/recipes", recipesRoute);

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
