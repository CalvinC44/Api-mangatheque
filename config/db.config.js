"use strict";
const mysql = require("mysql");

const dbConn = mysql.createConnection({
  password: "myxdog-sAxvir-3magsy",
  user: "mangatheque",
  host: "51.159.24.214",
  port: "11945",
  database: "mangatheque"
});

dbConn.connect(function (err) {
  if (err) throw err;

  console.log("Database Connected!");
});
module.exports = dbConn;
