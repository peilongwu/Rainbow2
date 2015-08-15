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
		if(!$.isNumeric(value)){
			return 'must be a number';
		};
		return true;
	}

	exports.max = function(value, num){
		if(exports.required(value) && num < value){
			return 'not greater than ' + num;
		}
		return true;
	}

	exports.min = function(value, num){
		if(exports.required(value) && num > value){
			return 'not less than ' + num;
		}
		return true;
	}

	exports.maxLength = function(value, num){
		if(exports.required(value) && num < len(value)){
			return 'not more than ' + num + ' characters';
		}
		return true;
	}

	exports.minLength = function(value, num){
		if(exports.required(value) && num > len(value)){
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
		if(exports.required(value) && rule.test(value)){
			return 'must be letters';
		}
		return true;
	}

	exports.chinese = function(value){
		var rule = /[u4e00-u9fa5]/;
		if(exports.required(value) && rule.test(value)){
			return 'must be chinese';
		}
		return true;
	}

	exports.email = function(value){
		var rule = /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/;
		if(exports.required(value) && rule.test(value)){
			return 'must be email';
		}
		return true;
	}

	exports.password = function(value){
		var rule = /^[a-zA-Z]w{5,17}$/;
		if(exports.required(value) && rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.zip = function(value){
		var rule = /[1-9]d{5}(?!d)/;
		if(exports.required(value) && rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.telphone = function(value){
		var rule = /d{3}-d{8}|d{4}-d{7}/;
		if(exports.required(value) && rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}

	exports.url = function(value){
		var rule = /[a-zA-z]+:\/\/[^s]*/;
		if(exports.required(value) && rule.test(value)){
			return 'must be url';
		}
		return true;
	}

	exports.variable = function(value){
		var rule = /^[a-zA-Z]w{63}$/;
		if(exports.required(value) && rule.test(value)){
			return 'must be 6-18 letters or numbers';
		}
		return true;
	}


});