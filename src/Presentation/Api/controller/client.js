var express = require('express');
var router = express.Router();
//var clientRepository = require("../../../Infra/Data/Repositories/clientRepository");
router.get("", (req, res) => {
	var clientRepository = require("../../../Infra/Data/Repositories/clientRepository")(req.env);
	clientRepository.GetAll((err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.post("", (req, res) => {
	var clientRepository = require("../../../Infra/Data/Repositories/clientRepository")(req.env);
	var obj = req.body;
	clientRepository.Save(obj, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.put("", (req, res) => {
	var clientRepository = require("../../../Infra/Data/Repositories/clientRepository")(req.env);
	var obj = req.body;
	clientRepository.Update(obj, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(success);
	});

});
router.delete("/:id", (req, res) => {
	var clientRepository = require("../../../Infra/Data/Repositories/clientRepository")(req.env);
	var _id = req.params.id;
	clientRepository.Delete(_id, (err, success) => {
		if (err)
			res.send(500, err);
		else
			res.send(200, success);
	});

});

module.exports = router;