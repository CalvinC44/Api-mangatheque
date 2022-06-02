const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRoutes = require("./src/routes/user.routes");

app.use("/api/mangatheque/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
