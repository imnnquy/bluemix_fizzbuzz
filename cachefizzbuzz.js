var FizzBuzz = require("./fizzbuzz");

var CacheFizzBuzz = function(dbURL) {
	this._dbURL = dbURL;
	this._Cloudant = require("cloudant")(dbURL);
	this._fizzbuzz = new FizzBuzz();
};

CacheFizzBuzz.prototype.fizzBuzzRange = function(start, end, callback) {
	var self = this;
	var parms = {
		key : [ start, end ],
		include_docs : true
	};
	self._Cloudant.view('fb', 'range', parms, function(err, body) {
		self._processDBResult(err, body, start, end, callback);
	});
};

CacheFizzBuzz.prototype._dbStoreCalculatedResult = function(data) {
	this._Cloudant.insert(data);
};

CacheFizzBuzz.prototype._processDBResult = function(err, body, start, end,
		callback) {
	var fromDB = false;
	var data = {};
	if ((!err) && (body.rows.length > 0)) {
		delete body.rows[0].doc._id;
		delete body.rows[0].doc._rev;
		data = body.rows[0].doc;
	} else {
		data = {
			"from" : start,
			"to" : end,
			"result" : this._fizzbuzz.convertRangeToFizzBuzz(start, end)
		};
		if (!err) {
			this._dbStoreCalculatedResult(data);
		}
	}
	callback(data);
};

module.exports = CacheFizzBuzz;