const db = require("../models");
const Manga = db.manga;

checkDuplicateManga = (req, res, next) => {
	Manga.findOne({
		where: {
			nameManga: req.body.nameManga,
			tome: req.body.tome
		}
	}).then((manga) => {
		if (manga) {
			res.status(400).send({
				message: "Failed, this tome manga is already existing"
			});
			return;
		}
		next();
	});
};

const verifyCreateManga = {
	checkDuplicateManga: checkDuplicateManga
};
module.exports = verifyCreateManga;
