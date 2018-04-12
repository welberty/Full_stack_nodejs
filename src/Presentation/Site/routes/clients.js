'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	var env = req.env;
	res.render('cadClient',
		{
			title: 'Cadastro de clientes loja ' + env.toUpperCase(),
			rgRequired: env == 'mg',
			checkBirthDay: env == 'sp'
		}
	);
});

router.get('/list', function (req, res) {
	var env = req.env;
	var params = req.query;
	var ClientRepository = require('../../../Infra/Data/Repositories/clientRepository')(req.ctx);
	//var ClientRepositorySP = require('../../Infra/Data/Repositories/clientRepository')('developmentsp');
	ClientRepository.Filter(params.name, params.cpf, params.birthDay, parseInt(params.offset), parseInt(params.limit), (err, result) => {
		if (err)
			res.send(500, err);
		else
			res.send(result);
	});
	//res.render('cadClient', { title: 'Cadastro de clientes loja ' + env.toUpperCase() });
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	var ClientRepository = require('../../../Infra/Data/Repositories/clientRepository')(req.ctx);
	ClientRepository.Delete(id, (err, callback) => {
		if (err)
			res.send(500, err);
		else
			res.send('The record was removed!');
	});
});

router.put('/', function (req, res) {
	var obj = req.body;
	var ClientRepository = require('../../../Infra/Data/Repositories/clientRepository')(req.ctx);
	ClientRepository.Update(obj, (err, result) => {
		if (err)
			res.send(500, err);
		else
			res.send(200,result);
	});
});

router.post('/', function (req, res) {
	var obj = req.body;
	var ClientRepository = require('../../../Infra/Data/Repositories/clientRepository')(req.ctx);
	ClientRepository.Save(obj, (err, result) => {
		if (err)
			res.send(500, err);
		else
			res.send(200, result);
	});
});
module.exports = router;
