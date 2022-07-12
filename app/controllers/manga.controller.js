const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Manga = db.manga;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/** ===Manga routes=== **/
//create Manga
exports.createManga = (req, res) => {
	if (!req.body.nameManga || !req.body.tome) {
		res.status(400).send({ message: "Content can not be empty" });
		return;
	}

	Manga.create({
		nameManga: req.body.nameManga,
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

//find All Manga
exports.findAllManga = (req, res) => {
	const nameManga = req.query.nameManga;
	var condition = nameManga
		? { nameManga: { [Op.like]: `%${nameManga}%` } }
		: null;
	Manga.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving the Manga"
			});
		});
};

//find manga with id
exports.findMangaId = (req, res) => {
	const id = req.params.id;
	Manga.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(409).send({
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
exports.updateManga = (req, res) => {
	const id = req.params.id;
	Manga.update(req.body, { where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Manga was updated successfully"
				});
			} else {
				res.send({
					message:
						"Cannot update Manga with id=${id}, maybe Manga was not found or req.body is empty"
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Manga with id=" + id
			});
		});
};

/** ===MangaUser routes=== **/
// TODO: transform into add manga to user only
//AddMangaToUser
exports.addMangaToUser = (req, res) => {
	const nameManga = req.body.nameManga;
	const tome = req.body.tome;
	Manga.findOne({
		where: { nameManga: nameManga, tome: tome }
	}).then((manga) => {
		if (manga === null) {
			res
				.status(500)
				.send({ message: "Can't find manga with this name and tome" });
		} else {
			const mangaId = manga.mangaId;
			const userId = 1;
			User.findByPk(userId)
				.then((user) => {
					user.setManga(mangaId).then((num) => {
						if (num == 1) {
							res.send({
								message: "Manga added successfully"
							});
						} else {
							res.status(409).send({
								message: "Cannot add Manga with id=${mangaId}"
							});
						}
					});
				})
				.catch((err) => {
					res.status(500).send({ message: err.message });
				});
		}
	});
};

//findMangaOfUser
exports.findMangaOfUser = (req, res) => {
	const username = req.body.username;
	User.findAll({ where: { username }, include: Manga })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(409).send({
					message: "Cannot find Manga of the user:${username}"
				});
			}
		})
		.catch((err) => {
			rs.status(500).send({
				message: "Error retrieving Manga of the user: " + username
			});
		});
};
/*User.findOne({ where: { username: username } })
		.then((user) => {
			const idUser = user.id;
			Manga.findAll({ where: { userId: idUser } })
				.then((data) => {
					if (data) {
						res.send(data);
					} else {
						res.status(404).send({
							message: "Cannot find Manga with user id=${idUser}"
						});
					}
				})
				.catch((err) => {
					rs.status(500).send({
						message: "Error retrieving Manga with user id=" + idUser
					});
				});
		})
		.catch((err) => {
			rs.status(500).send({
				message: "Error retrieving Manga with username" + username
			});
		});*/
