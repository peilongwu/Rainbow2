define(function(require, exports, module){
	var mode = module.config().mode;
	var _ = require('underscore');
	var Backbone = require('backbone');
	var queue = {};
	var Dataset = Backbone.Model.extend({
		initialize:function(options){
			this.params = new Backbone.Model(options.params);
			this.queue = {};
			this.exist = false;
			this.name = options.name;
			this.params.on('change',function(e){
				this.query();
			}, this);
		},
		parse:function(response, options){
			return response.Rowsets.Rowset[0];
		},
		setParam:function(){
			return this;
		},
		query:function(){
			//if(!queue[this.url]){
			if(mode === 'demo'){
				this.url = 'dataset/' + this.name;
				this.addQueue();
				var _this = this; 
				require([this.url],function(response){
					var data = response.Rowsets.Rowset[0];
					if(_this.params){
						//data.Row = _.where(data.Row,_this.params.toJSON());
					}
			
					setTimeout(function(){
						_this.clear({silent:true});
						_this.set(data);
						_this.exist = true;
						_this.removeQueue();
					},10);
				});
			}else{

				var queryString = '';
				if(!_.isEmpty(this.params.toJSON())){
					queryString = '&' + $.param(this.params.toJSON());
				}

				if(mode === 'develop'){
					this.url = 'dataset/' + encodeURIComponent(this.name) + '?';
				}else{
					if(queryString){
						queryString = queryString.replace(/=(([^&]+)(?=&)*)/g,"='$1'");
						queryString = '&Param.30=' + queryString.replace(/&/g,' AND ');
					}
					var url = '/XMII/Illuminator?Content-Type=text%2Fjson';
					this.url = url + '&QueryTemplate=' + this.name;
				}

				this.url += queryString;

				this.addQueue();
				this.fetch({
					success:function(model, response, options){
						model.removeQueue()
					},
					error:function(model, response, options){
						model.removeQueue()
					}
				});
			}
			return this;
		},
		addQueue:function(){
			queue[this.url] = 1;
			return this;
		},
		removeQueue:function(){
			queue[this.url] && delete queue[this.url];
			return this;
		},
		getQueue:function(){
			return queue;
		},
		where:function(query){

		},
		findWhere:function(query){

		},
		max:function(name){

		},
		min:function(name){

		},
		first:function(){

		},
		last:function(){

		},
		update:function(){
			return this;
		},
		getColumn:function(name){
			return _.pluck(this.get('Row'), name);
		},
		getColumns:function(){
			return this.get('Columns').Column;
		},
		getRow:function(index){
			return this.get('Row')[index] ? this.get('Row')[index] : null;
		},
		getRows:function(){
			return this.get('Row') ? this.get('Row') : [];
		}
	});
	return Dataset;
});