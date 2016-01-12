var FizzBuzz = function() {
};

FizzBuzz.prototype.divisibleBy = function(number, divisor) {
	return number % divisor === 0;
};

FizzBuzz.prototype.convertToFizzBuzz = function(number) {
	if (this.divisibleBy(number, 15)) {
		return "FizzBuzz";
	}
	if (this.divisibleBy(number, 3)) {
		return "Fizz";
	}
	if (this.divisibleBy(number, 5)) {
		return "Buzz";
	}
	return number.toString();
};

FizzBuzz.prototype.convertRangeToFizzBuzz = function(start, end) {
	console.log("quy log start: " + start);
	console.log("quy log end: " + end);
	var result = [];
	var from = parseInt(start);
	var to = parseInt(end);
	for (var i = from; i <= to; i++) {
		console.log("quy log current: " + i);
		result.push(this.convertToFizzBuzz(i));
	}
	console.log("quy log result: ", result);
	return result;
};

module.exports = FizzBuzz;