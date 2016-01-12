var FizzBuzz = require("../fizzbuzz.js");
describe("Fizzbuzz", function() {
	var f = new FizzBuzz();
	describe("divisibleBy()", function() {
		it("when divisible", function() {
			expect(f.divisibleBy(3, 3)).to.be.eql(true);
		});
		it("when not divisible", function() {
			expect(f.divisibleBy(3, 2)).to.be.eql(false);
		});
	});

	describe("convertToFizzBuzz()", function() {
		it("when divisible by 3", function() {
			expect(f.convertToFizzBuzz(3)).to.be.eql("Fizz");
			expect(f.convertToFizzBuzz(6)).to.be.eql("Fizz");
		});
		it("when divisible by 5", function() {
			expect(f.convertToFizzBuzz(5)).to.be.eql("Buzz");
			expect(f.convertToFizzBuzz(10)).to.be.eql("Buzz");
		});
		it("when divisible by 15", function() {
			expect(f.convertToFizzBuzz(15)).to.be.eql("FizzBuzz");
			expect(f.convertToFizzBuzz(30)).to.be.eql("FizzBuzz");
		});
		it("when not divisible by 3, 5 or 15", function() {
			expect(f.convertToFizzBuzz(4)).to.be.eql("4");
			expect(f.convertToFizzBuzz(7)).to.be.eql("7");
		});
	});
});
