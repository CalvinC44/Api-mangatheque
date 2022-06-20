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

    //createManga

    //getAllManga
	app.get("/api/manga/all", controller.getAllManga);

    //deleteManga
    //createAddMangaToUser
    //AddMangaToUser

	app.get(
		"/api/manga/userManga",
		[authJwt.verifyToken, verifyCreateManga.checkDuplicateManga],
		controller.userBoard
	);
	app.get(
		"/api/manga/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		controller.moderatorBoard
	);
	app.get(
		"/api/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
	);
};
