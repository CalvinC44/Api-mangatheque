const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Manga = db.manga;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/** ===Manga routes=== **/
//create Manga
exports.createManga = (req, res) => {
	if (!req.body.name || !req.body.tome) {
		res.status(400).send({ message: "Content can not be empty" });
		return;
	}

	Manga.create({
		name: req.body.nameManga,
		tome: req.body.tome
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Manga"
			});
		});
};

//get All Manga
exports.findAllManga = (req, res) => {
	Manga.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Manga"
			});
		});
};

//get manga with id
exports.findOneManga = (req, res) => {
	const id = req.params.id;
	Manga.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: "Cannot find Manga with id=${id}"
				});
			}
		})
		.catch((err) => {
			rs.status(500).send({
				message: "Error retrieving Manga with id=" + id
			});
		});
};

//delete Manga
exports.deleteManga = (req, res) => {
	const id = req.params.id;
	Manga.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Manga tome was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete nameManga=${id}. Maybe Manga was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Manga with id" + id
			});
		});
};

//update manga
exports.updateManga;

/** ===MangaUser routes=== **/
// TODO: transform into add manga to user only
exports.addMangaToUser = (req, res) => {
	Manga.create({
		name: req.body.name,
		tome: req.body.tome
	})
		.then((manga) => {
			if (req.body.user) {
				User.findAll({
					where: {
						name: {
							[Op.or]: req.body.user
						}
					}
				}).then((manga) => {
					manga.setUser(users).then(() => {
						res.send({ message: "Manga was registered to user!" });
					});
				});
			} else {
				// user role = 1
				res.send({ message: "Manga created but not added to a user!" });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};