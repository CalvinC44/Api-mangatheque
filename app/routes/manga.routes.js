const { authJwt, verifyCreateManga } = require("../middleware");
const controller = require("../controllers/manga.controller");
module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	/** ===Manga routes=== **/
	//create Manga
	app.post("/api/manga", controller.createManga);

	//find All Manga
	app.get("/api/manga", controller.findAllManga);

	//find manga with id
	app.get("/api/manga/:id", controller.findMangaId);

	//delete Manga
	app.delete("/api/manga/:id", controller.deleteManga);

	//update manga
	app.put("/api/manga/:id", controller.updateManga);

	//AddMangaToUser
	app.post("/api/userManga", controller.addMangaToUser);

	//findMangaOfUser
	app.get("/api/userManga", controller.findMangaOfUser);
};
