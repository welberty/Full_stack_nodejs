'use strict';
function validCpf(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000") return false;

	for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10))) return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11))) return false;
	return true;
}

var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
	var Client = sequelize.define('Client', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			validate: {
				isEven(value) {
					if (!validCpf(value)) {
						throw new Error('Cpf invalid!');
					}
				}
			}
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		rg: {
			type: DataTypes.STRING(13),
			allowNull: (!sequelize._env.includes("mg"))
		},
		birthDay: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isEven(value) {
					var dateNow = moment(Date.now());
					var dateCheck = moment(value);
					if (sequelize._env.includes("sp") && (dateNow.diff(dateCheck, 'years')) < 18) 
						throw new Error('the client must be over 18 years old');
				}
			}
		},
		data: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('NOW()'),
			allowNull: true
		}
	},
		{
			indexes: [
				{
					unique: true,
					fields: ['cpf']
				}
			]
		});
	Client.associate = function (models) {
		// associations can be defined here
		Client.hasMany(models.PhoneNumber);
	};
	return Client;
};