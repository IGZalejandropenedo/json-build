var assert = require('assert');

describe('Mediaquery Helper', function () {
	var mediaQuery = require('../src/json-build');

	it('Should return a json with a single field', function (done) {
		var expected = {
			first: 1
		};

		var actual = (new mediaQuery())
			.addValue('first', 1)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 2 fields on the same level', function (done) {
		var expected = {
			first: 1,
			second: 2
		};

		var actual = (new mediaQuery())
			.addValue('first', 1)
			.addValue('second', 2)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 2 nested fields', function (done) {
		var expected = {
			first: {
				second: 2
			}
		};

		var actual = (new mediaQuery())
			.addValue('first.second', 2)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 3 nested fields', function (done) {
		var expected = {
			first: {
				second: {
					third: 3
				}
			}
		};

		var actual = (new mediaQuery())
			.addValue('first.second.third', 3)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 2 fields and 1 nested', function (done) {
		var expected = {
			first: {
				second: 2
			},
			third: 3
		};

		var actual = (new mediaQuery())
			.addValue('first.second', 2)
			.addValue('third', 3)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 1 nested field with 2 fields', function (done) {
		var expected = {
			first: {
				second: 2,
				third: 3
			},
		};

		var actual = (new mediaQuery())
			.addValue('first.second', 2)
			.addValue('first.third', 3)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 1 nested field with 2 fields, overwriting one of them', function (done) {
		var expected = {
			first: {
				second: 2,
				third: 2
			},
		};

		var actual = (new mediaQuery())
			.addValue('first.second', 2)
			.addValue('first.third', 3)
			.addValue('first.third', 2)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 1 nested field with 2 fields, overwriting one of them with another object', function (done) {
		var expected = {
			first: {
				second: 2,
				third: {
					fourth: 4
				}
			},
		};

		var actual = (new mediaQuery())
			.addValue('first.second', 2)
			.addValue('first.third', 3)
			.addValue('first.third.fourth', 4)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json without nested fields with an array with 2 items', function (done) {
		var expected = {
			first:  [1,2]
		};

		var actual = (new mediaQuery())
			.pushValue('first', 1)
			.pushValue('first', 2)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 1 nested field with an array with 2 items', function (done) {
		var expected = {
			first: {
				second: [1,2]
			},
		};

		var actual = (new mediaQuery())
			.pushValue('first.second', 1)
			.pushValue('first.second', 2)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});

	it('Should return a json with 2 nested field with an array with 2 items', function (done) {
		var expected = {
			first: {
				second: [1,2],
				third: 3
			},
		};

		var actual = (new mediaQuery())
			.pushValue('first.second', 1)
			.pushValue('first.second', 2)
			.addValue('first.third', 3)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});
	it('Should return a json with 2 nested fields with an array with 2 items and another nesting with an array of 1 element', function (done) {
		var expected = {
			first: {
				second: [1,2],
				third: {
					fourth: [4]
				}
			},
		};

		var actual = (new mediaQuery())
			.pushValue('first.second', 1)
			.pushValue('first.second', 2)
			.pushValue('first.third.fourth', 4)
			.build();
		assert.deepEqual(actual, expected, "Expected " + JSON.stringify(expected) + " but got: " + JSON.stringify(actual));

		done();
	});
});