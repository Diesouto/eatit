require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/api/books");
const loginRoute = require("./routes/api/login");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/login", loginRoute);

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
