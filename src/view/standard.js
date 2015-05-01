define(function(require){
	var Base = require('./base');
	var Kit = {
		Action:require('./kit/action'),
		Filter:require('./kit/filter'),
	};
	var Pagination = require('./kit/pagination')
	var Table = require('./widget/webkit/table');
	var filter = require('../utility/filter');
	var Standard = Base.extend({
		tplId:'tpl-view-standard',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.idName = this.model.get('schema').idName;
			var Model = Backbone.Model.extend({
				id: this.idName
			});
			this.collection =  new Backbone.Collection([],{model:Model});
			this.model.get('handle') && this.handle();
			this.kits = {
				//breadcrum:'breadcrum',
				Action:this.model.get('actions'),
				Filter:this.model.get('schema').filters
			};
		},
		events:{
			'click .rb-title':'details'
		},
		handle:function(){
			//this.isHandle = true;
			this.selecteds = new Backbone.Collection;
		},
		render:function(){
			Base.prototype.render.apply(this, arguments);
			this.renderKit();
			this.update();
			return this;
		},
		renderKit:function(){
			for(var i in this.kits){
				this.kits[i] && this.renderKitItem(i, this.kits[i]);
			}
			return this;
		},
		renderKitItem:function(name, data){
			var options = {view:this};
			options.collection = new Backbone.Collection(data);
			var kit = new Kit[name](options).render();
			return this;
		},
		pagination: function(){
			this.model.get('data').pagination && new Pagination({
				model: new Backbone.Model(this.model.get('data').pagination),
				view: this
			}).render();
			return this;
		},
		content:function(){

			var schemas = _.map(this.model.get('schema').attributes, function(o){
				if(o.typeObject && o.typeObject.list){
					o.format = filter['enum'];
				}else if(o.metaType === 'wordbook'){
					o.format = filter['wordbook'];
				}else if(o.metaType === 'time'){
					o.format = filter['time'];
				}else if(o.name === this.idName){
					o.format = filter['id'];
				}else if(o.display === 'title'){
					o.format = filter['title'];
				}
				return o;
			}, this);

			schemas = _.reject(schemas, function(o){
				return this.idName === o.name 
				|| (o.hidden && ['list','all'].indexOf(o.hidden) >= 0);
			}, this);

			var model = new Backbone.Model({
				series:schemas,
				data:this.model.get('data').collection
			});

			var content = new Table({
				model:model,
				view:this
			});

			content.render().$el.appendTo(this.$('.rb-content-body'));
		},
		details:function(e){

		},
		setCollection:function(){
			this.collection.reset();
			this.collection.set(this.model.get('data').collection);
		},
		selectedRow:function(){
			
		},
		selectedAllRows:function(){
			
		},
		getSelectedState:function(type){
			var length = 0; //this.selecteds.length;
			var status = true;
			switch(type){
				case 'none':
					length > 0 && (status = false);
					break;
				case 'somewhat':
					length < 1 && (status = false);
					break;
				case 'single':
					length !== 1 && (status = false);
					break;
				case 'mulpitle':
					length < 2 && (status = false);
			}
			return status;
		},
		update:function(){
			this.setCollection();
			this.pagination();
			this.content();
		},
		error:function(){
			
		}
	});
	
	return Standard;
});