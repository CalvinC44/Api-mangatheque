module.exports = (sequelize, Sequelize) => {
	const Manga = sequelize.define("mangas", {
		nameManga: {
			type: Sequelize.STRING
		},
		tome: {
			type: Sequelize.INTEGER
		}
	});
	return User;
};
