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
	var result = [];
	var from = parseInt(start);
	var to = parseInt(end);
	for (var i = from; i <= to; i++) {
		result.push(this.convertToFizzBuzz(i));
	}
	return result;
};

module.exports = FizzBuzz;