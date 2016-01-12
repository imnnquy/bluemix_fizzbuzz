var sinon = require("sinon");
var CacheFizzBuzz = require("../cachefizzbuzz.js");

var testResult1 = {
	"from" : "1",
	"to" : "20",
	"result" : [ "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz",
			"Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz",
			"19", "Buzz" ]
};

var testResult2 = {
	"from" : "2",
	"to" : "21",
	"result" : [ "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
			"11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19",
			"Buzz", "Fizz" ]
};
var DBResult1 = {
	"total_rows" : 7,
	"offset" : 6,
	"rows" : [ {
		"id" : "35523244d141fb56c2e6b8dfa58d7fed",
		"key" : [ "1", "20" ],
		"value" : null,
		"doc" : {
			"_id" : "35523244d141fb56c2e6b8dfa58d7fed",
			"_rev" : "1-a0337a71e877726cb8fda7d6ceeb2bfc",
			"from" : "1",
			"to" : "20",
			"result" : [ "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8",
					"Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16",
					"17", "Fizz", "19", "Buzz" ]
		}
	} ]
};
var DBResult2 = {
	"total_rows" : 7,
	"offset" : 7,
	"rows" : []
};

describe(
		"CacheFizzbuzz",
		function() {
			var f = new CacheFizzBuzz("http://user:password@localhost/fizzbuzz");
			describe("dbStoreCalculatedResult()", function() {
				it("calls Cloudant to store the doc", function() {
					var mock = sinon.mock(f._Cloudant);
					mock.expects("insert").withArgs(testResult1).once();
					f._dbStoreCalculatedResult(testResult1);
					mock.verify();
					mock.restore();
				});
			});

			describe(
					"fizzBuzzRange()",
					function() {
						var cbFunction = function(data) {
						};
						it(
								"calls Cloudant to get record from the fb/range view in DB",
								function() {
									var stub = sinon.stub(f._Cloudant, "view");
									f.fizzBuzzRange("1", "20", cbFunction);
									expect(stub.withArgs('fb', 'range', {
										include_docs : true,
										key : [ "1", "20" ]
									}, sinon.match.any).calledOnce).to.be
											.eql(true,
													"Expected cloudant.view to be called only once with correct parameters");
									f._Cloudant.view.restore();
								});
					});
			describe(
					"processDBResult()",
					function() {
						var cbFunction = sinon.spy();
						var fizzBuzzSpy = null;
						beforeEach(function() {
							fizzBuzzSpy = sinon.spy(f._fizzbuzz,
									"convertRangeToFizzBuzz");
						});
						afterEach(function() {
							cbFunction.reset();
							f._fizzbuzz.convertRangeToFizzBuzz.restore();
						});
						it(
								"processes the results from Cloudant with a valid result set",
								function() {
									var storeResultsSpy = sinon.spy(f,
											"_dbStoreCalculatedResult");
									f._processDBResult(false, DBResult1, "1",
											"20", cbFunction);
									expect(cbFunction.withArgs(testResult1).calledOnce).to.be
											.eql(true,
													"Expected processDBResult to parse DB return");
									expect(fizzBuzzSpy).callCount(0);
									expect(storeResultsSpy).callCount(0);
									f._dbStoreCalculatedResult.restore();
								});
						it(
								"calculates the results when no results found then saves to DB",
								function() {
									storeResultsStub = sinon.stub(f,
											"_dbStoreCalculatedResult");
									f._processDBResult(false, DBResult2, "2",
											"21", cbFunction);
									expect(cbFunction.withArgs(testResult2).calledOnce).to.be
											.eql(true,
													"Expected calculated result when no data from DB");
									expect(fizzBuzzSpy.withArgs("2", "21").calledOnce).to.be
											.eql(true,
													"convertRangeToFizzBuzz should be called to calculate results");
									expect(storeResultsStub
											.withArgs(testResult2).calledOnce).to.be
											.eql(true,
													"Expect calculated restuls to be stored in DB");
									f._dbStoreCalculatedResult.restore();
								});
						it(
								"calculates results when DB error,but doesn't store results",
								function() {
									storeResultsSpy = sinon.spy(f,
											"_dbStoreCalculatedResult");
									f._processDBResult(true, DBResult1, "1",
											"20", cbFunction);
									expect(cbFunction.withArgs(testResult1).calledOnce).to.be
											.eql(true,
													"Expected processDBResult create empty result with DB error");
									expect(fizzBuzzSpy.withArgs("1", "20").calledOnce).to.be
											.eql(true,
													"convertRangeToFizzBuzz should be called to calculate results");
									expect(storeResultsSpy).callCount(0);
									f._dbStoreCalculatedResult.restore();
								});
					});
			// remaining tests go above here
		});