'use strict';

var ctx = environment => {

	var fs = require('fs');
	var path = require('path');
	var Sequelize = require('sequelize');
	var basename = path.basename(__filename);
	var env = process.env.NODE_ENV || environment || 'development';
	var config = require('./database.json')[env];
	var db = {};

	if (config.use_env_variable) {
		var sequelize = new Sequelize(process.env[config.use_env_variable], config);
	} else {
		var sequelize = new Sequelize(config.database, config.username, config.password, config);
	}
	sequelize['_env'] = env;
	//Get entities
	//fs
	//	.readdirSync("C:/Users/welbe/source/repos/ApiEComerce/ApiEComerce/src/Domain/Entities")
	//	.filter(file => {
	//		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	//	})
	//	.forEach(file => {
	//		var model = sequelize['import'](path.join("../../Domain/Entities", file));
	//		db[model.name] = model;
	//	});

	var Client = sequelize.import("../../Domain/Entities/client");
	var PhoneNumber = sequelize.import("../../Domain/Entities/phoneNumber");

	db[Client.name] = Client;
	db[PhoneNumber.name] = PhoneNumber;

	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	//sequelize.sync({ alter: true });
	sequelize.sync();
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;
	return db;
};

module.exports = ctx;