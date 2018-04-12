var base = model => {
	return {
		GetAll: callback => {
			model
				.findAll()
				.then(result => {
					callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		GetById: (id, callback) => {
			model
				.findById(id)
				.then(result => {
					callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		Save: (obj, callback) => {
			model
				.build(obj)
				.save()
				.then(result => {
					callback(null, result);
				})
				.catch(err => {
					callback(err, null);
				});
		},
		Update: (obj, callback) => {
			model.update(obj)
				.then(result => {
					callback(null, result);
				})
				.catch(e => {
					callback(e, null);
				});
		},
		Delete: (_id, callback) => {
			model.destroy({ where: { id: _id } })
				.then(result => {
					callback(null, result);
				})
				.catch(e => {
					callback(e, null);
				});
		}
	};
};
module.exports = base;