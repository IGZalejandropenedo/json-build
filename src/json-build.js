module.exports = function () {
	var entity = {};

	var addField = function (to, fields, value) {
		var field = fields.shift();

		if (fields.length > 0) {
			if (!to[field]) {
				to[field] = {};
			} else {
				if (fields.length > 0 && typeof to[field] != 'object') {
					to[field] = {};
				}
			}
			addField(to[field], fields, value);
		} else {
			to[field] = value;
		}
	};

	var pushField = function (to, fields, value) {
		var field = fields.shift();

		if (fields.length > 0) {
			if (!to[field]) {
				to[field] = {};
			} else {
				if (fields.length > 0 && typeof to[field] != 'object') {
					to[field] = {};
				}
			}
			pushField(to[field], fields, value);
		} else {
			if(!to[field]) {
				to[field] = [];
			}
			to[field].push(value);
		}
	};

	this.addValue = function (field, value) {
		var parts = field.split('.');

		addField(entity, parts, value);

		return this;
	};

	this.pushValue = function(field, value) {
		var parts = field.split('.');

		pushField(entity, parts, value);

		return this;
	};

	this.build = function () {
		return entity;
	};
};