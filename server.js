var express = require("express");
var app = express();

var FizzBuzz = require("./fizzbuzz");
app.get("/fizzbuzz_range/:from/:to", function(req, res) {
	var fizzbuzz = new FizzBuzz();
	var from = req.params.from;
	var to = req.params.to;
	res.send({
		from : from,
		to : to,
		result : fizzbuzz.convertRangeToFizzBuzz(from, to)
	});
});

var server_port = process.env.VCAP_APP_PORT || 3000;
var server_host = process.env.VCAP_APP_HOST || "localhost";
var server = app.listen(server_port, server_host, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});