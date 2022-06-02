"use strict";

var dbConn = require("../../config/db.config");

var User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.created_time = new Date();
};

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.findById = function (id, result) {
  dbConn.query(
    "SELECT * FROM user WHERE user_id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.findAll = function (result) {
  dbConn.query("SELECT * FROM user", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users:", res);
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE user SET username=?, email=?, password=?, nom=? prenom=? WHERE id=?",
    [user.username, user.email, user.password, user.nom, user.prenom, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM user WHERE id= ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = User;
