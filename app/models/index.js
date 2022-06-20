const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	port: config.PORT,
	dialect: config.dialect,
	operatorsAliases: false,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle
	}
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.manga = require("../models/manga.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId"
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId"
});

db.manga.belongsToMany(db.user, {
	through: "user_mangas",
	foreignKey: "mangaId",
	otherKey: "userId"
});
db.user.belongsToMany(db.manga, {
	through: "user_mangas",
	foreignKey: "userId",
	otherKey: "mangaId"
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
