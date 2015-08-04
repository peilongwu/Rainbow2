define(function(require, exports){

	exports.enum =  function(value){
		//var model = this.model.get('typeObject');
		list = this.model.get('list').split(',');
		list = _.map(list, function(item){
			var s = item.split(':');
			return {title:s[1] ? s[1] : s[0], value:s[0]};
		});
		var item = _.findWhere(list, {value:value});
		var value = item ? item.title : '';
		if(this.model.get('display') && this.model.get('display') === 'title'){
			value = '<a class="rb-title" href="javascript:void(0);">' + value + '</a>';
		}
		return value;
	};

	exports.wordbook = function(value){
		var model = this.model.get('typeObject');
		var idName = model.schema.idName;
		var where = {};
		where[idName] = value;
		var title = _.findWhere(model.schema.attributes, {display:'title'});
		var item = _.findWhere(model.data.collection, where);
		var value = item && title ? item[title.name] : '';
		if(this.model.get('display') && this.model.get('display') === 'title'){
			value = '<a class="rb-title" href="javascript:void(0);">' + value + '</a>';
		}
		return value;
	};

	exports.time = function(value, raw, isDate){
		var str = '';
		time = parseInt(value);
		if(time){
			var date = new Date(time);
			var today = new Date();
			var y = date.getFullYear();
			if(true !== raw){
				y = y.toString().slice(2);
			}
			var m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? '0' + d : d;
			str += y + '-';
			str += m + '-';
			str += d + '';
			if(true !== isDate){
				str += ' ' + (date.getHours()<10?'0'+date.getHours():date.getHours());
				str += ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
			}
		}else{
			str = value;	
		}
		return str;
	}

	exports.id = function(value){
		return value;
	};

	exports.title = function(value){
		return '<a class="rb-title" href="javascript:void(0);">' + value + '</a>';
	};

	exports.byte = function(value){
		var str = '-';
		var size = parseInt(value);
		if(size){
			if(size && size < 1024){
				str = '1KB';
			}else if(size < 1048576){
				str = Math.round(size/1024) + 'KB';
			}else{
				str = (size/1048576).toFixed(2) + 'MB';
			}
		}else{
			str = value;
		}
		return str;
	};

});