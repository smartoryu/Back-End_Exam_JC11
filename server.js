const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
require("dotenv").config();

const PORT = process.env.PORT;

// =============== Middleware =============== //
app.use(cors());
app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ================= Routes ================ //
const { authRouters, movieRouters, categoryRouters, movcatRouters } = require("./routers");

// =========== Routes Middleware =========== //
app.use("/auth", authRouters);
app.use("/cat", categoryRouters);
app.use("/movie", movieRouters);
app.use("/movcat", movcatRouters);

app.get("/", (req, res) => res.status(200).send("Welcome to Backend Exam API!"));
app.listen(PORT, () => console.log("running on port " + PORT));
