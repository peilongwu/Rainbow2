define(function(require){
	var Base = require('./base');
	var Kit = {
		Action:require('./kit/action'),
		Filter:require('./kit/filter'),
	};
	var Pagination = require('./kit/pagination')
	var Table = require('../components/list/table');
	var filter = require('../utility/filter');

	var Standard = Base.extend({
		tplId:'tpl-view-standard',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.idName = this.model.get('schema').idName;
			this.Model = Backbone.Model.extend({
				idAttribute: this.idName,
				parse:function(response){
					return response.data;
				}
			});
			this.collection =  new Backbone.Collection([],{model:this.Model});
			this.collection.on('add',function(){
				this.update();
			}, this);
			this.collection.on('change:_selected', function(model, value){
				value && this.selected(model);
				value || this.unselected(model);
			}, this);
			this.selecteds = new Backbone.Collection;
			this.model.get('handle') && this.handle();
			this.createSchema = _.where(this.model.get('schema').attributes, {create: true, system: false});
			this.updateSchema = _.where(this.model.get('schema').attributes, {update: true, system: false});
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
			this.isHandle = true;
		},
		render:function(){
			Base.prototype.render.apply(this, arguments);
			this.renderKit();
			this.setCollection();
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
		widget:function(){

			var schemas = _.map(this.model.get('schema').attributes, function(o){
				if(o.typeObject && o.typeObject.list){
					o.format = filter['enum'];
				}else if(o.dataType === 'wordbook'){
					o.format = filter['wordbook'];
				}else if(o.metaType === 'Time'){
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
				data:this.collection
			});

			var widget = new Table({
				model:model,
				view:this,
				isHandle:this.isHandle
			});

			widget.render().$el.appendTo(this.$('.rb-content-body').empty());
		},
		details:function(e){

		},
		setCollection:function(){
			this.selecteds.reset();
			this.collection.reset(this.model.get('data').collection);
		},
		selected:function(model){
			this.selecteds.add(model);
			this.renderKitItem('Action', this.kits.Action);
		},
		unselected:function(model){
			this.selecteds.remove(model);
			this.renderKitItem('Action', this.kits.Action);
		},
		selectedAll:function(){
			
		},
		getSelectedState:function(type){
			var length = this.selecteds.length;
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
		getActiveModel:function(){
			return this.selecteds.findWhere({_selected:true});
		},
		getSelecteds:function(){
			
		},
		update:function(){
			this.pagination();
			this.widget();
		},
		error:function(){
			
		}
	});
	return Standard;
});