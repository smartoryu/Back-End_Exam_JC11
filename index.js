const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 2600;

// =============== Middleware =============== //
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// ================= Routes ================ //
const { authRouters, movieRouters, categoryRouters, movcatRouters } = require("./routers");

// =========== Routes Middleware =========== //
app.use("/auth", authRouters);
app.use("/cat", categoryRouters);
app.use("/movie", movieRouters);
app.use("/movcat", movcatRouters);

app.get("/", (req, res) => res.status(200).send("Welcome to Exam API!"));
app.listen(PORT, () => console.log("running on port " + PORT));
