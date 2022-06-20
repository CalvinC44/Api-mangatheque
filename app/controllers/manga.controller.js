const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Manga = db.manga;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

exports.getAllManga = (req, res) => {
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

// Faire getAllUser

exports.deleteManga = (req, res) => {
	const nameManga = req.body.nameManga;
	const tome = req.body.tome;
	Manga.destroy({
		where: { nameManga: nameManga, tome: tome }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Manga tome was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete nameManga=${nameManga} with tome=${tome}. Maybe Manga with this tome was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete" + nameManga + "number " + tome
			});
		});
};

exports.createAddMangaToUser = (req, res) => {
	// Save Manga to Database
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

exports.addMangaToUser = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}
			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);
			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}
			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // 24 hours
			});
			var authorities = [];
			user.getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
				res.status(200).send({
					id: user.id,
					username: user.username,
					email: user.email,
					roles: authorities,
					accessToken: token
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
