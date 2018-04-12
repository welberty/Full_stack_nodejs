var express = require("express");
var app = express();
var requireDir = require("requiredir");
var controller = requireDir("./controller");

var bodyParser = require('body-parser');
var fs = require('fs');

app.get("/", function (req, res) {
	res.send("Hello World!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//capture enviroment
function checkEnv(req, res, next) {
	var env = 'development' + req.params.enviroment;
	req.env = env;
	next();
}

for (var i in controller) {
	if (controller[i].name == "router") {
		if (i != "index") {
			app.use("/api/:enviroment/" + i, checkEnv, controller[i]);
		} else {
			app.use("/api/:enviroment/", controller[i]);
		}
	}
}

app.listen(3000, function () {
	console.log("Example app listening on port 3000!");
});