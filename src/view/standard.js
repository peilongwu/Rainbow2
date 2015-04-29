define(function(require){
	var Base = require('./base');
	var Kit = {
		Action:require('./kit/action'),
		Filter:require('./kit/filter'),
	};
	var Pagination = require('./kit/pagination')
	
	var Standard = Base.extend({
		tplId:'tpl-view-standard',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.idName = this.model.get('schema').idName;
			this.collection =  new Backbone.Collection;
			this.model.get('handle') && this.handle();
			this.kits = {
				//breadcrum:'breadcrum',
				Action:this.model.get('actions'),
				Filter:this.model.get('schema').filters
			};
		},
		events:{
			
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
		},
		error:function(){
			
		}
	});
	
	return Standard;
});