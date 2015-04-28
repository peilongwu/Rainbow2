define(function(require){
	var Base = require('./base');
	var kits = {
		Action:require('../component/kit/action')
	};
	
	var Standard = Base.extend({
		tplId:'tpl-view-general',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.idName = this.model.get('schema').idName;
			this.collection =  new Backbone.Collection;
			this.filter = new Backbone.Collection;
			this.model.get('handle') && this.handle();
			this.kits = {
				breadcrum:'breadcrum',
				action:this.model.actions,
				filter:this.model.get('schema').filters,
				pagination:this.model.get('data').pagination,
				collection:this.model.get('data').collection
			};
		},
		events:{
			
		},
		handle:function(){
			this.isHandle = true;
			this.selecteds = new Backbone.Collection;
			this.creates = new Backbone.Collection;
			this.updates = new Backbone.Collection;
			this.removes = new Backbone.Collection;
		},
		render:function(){
			Base.prototype.render.apply(this, arguments);
			this.renderKit();
			return this;
		},
		renderKit:function(){
			for(var i in this.kits){
				this.kits[i] && this.renderKit(i, this.kits[i]);
			}
			return this;
		},
		renderKitItem:function(kit, model){
			var Kit = kit.substring(0, 1).toUpperCase() + kit.substring(1).toLowerCase();
			model = new Backbone.Model(model);
			var kit = new Kit({model:model,view:this});
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
			var length = this.selecteds.size();
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
			
		},
		error:function(){
			
		}
	});
	
	return Standard;
});