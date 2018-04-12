module.exports = ctx => {
	var _ctx = require("../context.js")(ctx);
	var Client = _ctx.Client;
	var PhoneNumber = _ctx.PhoneNumber;
	var repositoryBase = require("./base/repositoryBase.js")(Client);
	return {
		...repositoryBase,
		GetAll: callback => {
			Client
				.findAll({
					include: [{ model: PhoneNumber, required:false}]
				})
				.then(result => {
					callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		GetById: (id, callback) => {
			Client
				.findById(id, { include: [PhoneNumber] })
				.then(result => {
					callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		Save: (obj, callback) => {
			Client
				.build(obj)
				.save()
				.then(result => {
					if (obj.PhoneNumbers && obj.PhoneNumbers.length > 0) {
						PhoneNumber.bulkCreate(obj.PhoneNumbers)
							.then(phones => {
								result.setPhoneNumbers(phones, { save: true })
									.then(_result => {
										callback(null, _result);
									})
									.catch(err => {
										callback(err, null);
									});
							})
							.catch(err => {
								callback(err, null);
							});
					}
					else
						callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		Update: (obj, callback) => {
			var client = Client.build(obj, { isNewRecord: false });
			client
				.update(obj, { where: { id: obj.id } })
				.then(result => {
					if (obj.PhoneNumbers && obj.PhoneNumbers.length > 0) {
						PhoneNumber.bulkCreate(obj.PhoneNumbers)
							.then(phones => {
								client.setPhoneNumbers(phones, { save: true })
									.then(_result => {
										callback(null, _result);
									})
									.catch(err => {
										callback(err, null);
									});
							})
							.catch(err => {
								callback(err, null);
							});
					}
					else
						callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		Filter: (name, cpf, birthDay, offset, limit, callback) => {
			var _where = {};
			if (name)
				_where['name'] = { $like: '%' + name + '%' };
			if (cpf)
				_where['cpf'] = cpf;
			if (birthDay)
				_where["birthDay"] = birthDay;

			Client
				.count({ where: _where })
				.then(count => {
					Client
						.findAll({
							where: _where,
							include: [{ model: PhoneNumber, required: false }],
							offset: offset,
							limit: limit
						})
						.then(result => {
							callback(null, { count: count, rows: result});
						})
						.catch(err => {
							callback(err, null);
						});
				})
				.catch(err => {
					callback(err, null);
				});
		}
	}
};