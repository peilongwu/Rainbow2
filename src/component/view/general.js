define(function(require){
	var Base = require('./base');
	var kits = {
		Action:require('./../kit/action')
	};
	
	var General = Base.extend({
		tplId:'tpl-view-general',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.idName = this.model.get('scheme').idName;
			this.collection =  new Backbone.Collection;
			this.filter = new Backbone.Collection;
			this.model.get('handle') && this.handle();
			this.kits = {
				breadcrum:'breadcrum',
				action:this.model.actions,
				filter:this.model.get('scheme').filters,
				pagination:this.model.get('content').page,
				content:this.model.get('content').body
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
			this.collection.set(this.model.get('content').body);
		},
		selectedRow:function(){
			
		},
		selectedAllRows:function(){
			
		},
		update:function(){
			
		},
		error:function(){
			
		}
	});
	
	return General;
});