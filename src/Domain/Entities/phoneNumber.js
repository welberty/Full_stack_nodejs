module.exports = (sequelize, DataTypes) => {
	var PhoneNumber = sequelize.define('PhoneNumber', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			number: {
				type: DataTypes.STRING(15),
				allowNull: false
			}
		},
		{
		});
	PhoneNumber.associate = function (models) {
		// associations can be defined here
		PhoneNumber.belongsTo(models.Client);
	};
	return PhoneNumber;
};