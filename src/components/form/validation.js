define(function(require, exports){

	function len(data) { 
		var l = 0; 
		data = data + '';
		var a = data.split(""); 
		var length = a.length;
		for (var i=0; i < length; i++) { 
			if (a[i].charCodeAt(0)<299) { 
				l++; 
			} else { 
				l+=2; 
			} 
		} 
		return l; 
	}

	function exist(value){
		return value == '0' || !!value;
	} 

	exports.required = function(value){
		if(value != '0' && !value){
			return 'is required';
		}
		return true;
	}

	exports.integer = function(value){
		return exports.number(value);
	}

	exports.number = function(value){
		if(exist(value) && !$.isNumeric(value)){
			return 'must be a number';
		};
		return true;
	}

	exports.max = function(value, num){
		if(exist(value) && num < value){
			return 'not greater than ' + num;
		}
		return true;
	}

	exports.min = function(value, num){
		if(exist(value) && num > value){
			return 'not less than ' + num;
		}
		return true;
	}

	exports.maxLength = function(value, num){
		if(exist(value) && num < len(value)){
			return 'not more than ' + num + ' characters';
		}
		return true;
	}

	exports.minLength = function(value, num){
		if(exist(value) && num > len(value)){
			return 'not less than ' + num + ' characters';
		}
		return true;
	}

	exports.date = function(value){
		return true;
	}

	exports.datetime = function(value){
		return true;
	}

	exports.year = function(value){
		return true;
	}

	exports.month = function(value){
		return true;
	}

	exports.alpha = function(value){
		var rule = /^[A-Za-z]+$/;
		if(exist(value) && !rule.test(value)){
			return 'must be letters';
		}
		return true;
	}

	exports.chinese = function(value){
		var rule = /^[\u4E00-\u9FFF]+$/;
		if(exist(value) && !rule.test(value)){
			return 'must be chinese';
		}
		return true;
	}

	exports.email = function(value){
		var rule = /^[0-9a-zA-Z_.]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
		if(exist(value) && !rule.test(value)){
			return 'must be email';
		}
		return true;
	}

	exports.password = function(value){
		var rule = /^[a-zA-Z]\w{5,17}$/;
		if(exist(value) && !rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.zip = function(value){
		var rule = /[1-9]d{5}(?!d)/;
		if(exist(value) && !rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.telphone = function(value){
		var rule = /^d{4}-d{8}|1d{10}$/;
		if(exist(value) && !rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.url = function(value){
		var rule = /^[a-zA-z]+:\/\/[^\s]*$/;
		if(exist(value) && !rule.test(value)){
			return 'must be url';
		}
		return true;
	}

	exports.code = function(value){
		var rule = /^[a-zA-Z][a-zA-Z0-9-]{0,127}$/;
		if(exist(value) && !rule.test(value)){
			return 'must be less than 64 alphanumeric and dash';
		}
		return true;
	}

	exports.variable = function(value){
		var rule = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;
		if(exist(value) && !rule.test(value)){
			return 'must be less than 64 alphanumeric and underscore';
		}
		return true;
	}


});