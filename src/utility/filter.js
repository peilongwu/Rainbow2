define(function(require, exports){

	exports.enum =  function(value, row, ignoreTitle){
		//var model = this.model.get('typeObject');
		list = this.model.get('list').split(',');
		list = _.map(list, function(item){
			var s = item.split(':');
			return {title:s[1] ? s[1] : s[0], value:s[0]};
		});
		var item = _.findWhere(list, {value:value.toString()});
		var value = item ? item.title : value;
		if(!ignoreTitle && this.model.get('display') && this.model.get('display') === 'title'){
			value = '<a class="rb-title" href="javascript:void(0);">' + value + '</a>';
		}
		return value.toString();
	};

	exports.wordbook = function(value, row, ignoreTitle){
		var model = this.model.get('typeObject');
		var idName = model.schema.idName;
		function wordbookFilter(value, list, idName, titleName){
			var len = list.length;
			for(var i = 0; i < len; i++){
				if(value == list[i][idName]){
					return list[i][titleName] ? list[i][titleName] : '';
				}

				if(list[i]['_childList']){
					var title = wordbookFilter(value, list[i]['_childList'], idName, titleName);
					if(title !== undefined){
						return title;
					}
				}
			}
			return undefined;
		}
		var title = _.findWhere(model.schema.attributes, {display:'title'});
		var item = wordbookFilter(value, model.data.collection, idName, title.name);
		var value = item !== undefined ? item : '';
		if(!ignoreTitle && this.model.get('display') && this.model.get('display') === 'title'){
			value = '<a class="rb-title" href="javascript:void(0);">' + value + '</a>';
		}
		return value.toString();
	};

	exports.time = function(value, raw, isDate){
		var str = '';
		var time = parseInt(value);
		if(time){
			var date = new Date(time);
			var today = new Date();
			var y = date.getFullYear();
			if(!raw){
				y = y.toString().slice(2);
			}else if(2 === raw){
				y = '';
			}
			var m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? '0' + d : d;
			str += y ? y + '-' : '';
			str += m ? m + '-' : '';
			str += d ? d + '' : '';
			if(true !== isDate){
				str += ' ' + (date.getHours()<10?'0'+date.getHours():date.getHours());
				str += ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
			}
		}else{
			str = value;	
		}
		return str;
	}

	exports.date = function(value){
		return exports.time(value, 2, true);
	};

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