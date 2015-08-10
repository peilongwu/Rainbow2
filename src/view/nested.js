define(function(require){
	var Base = require('./base');
	var Details = require('./details');
	var Item = Backbone.View.extend({
		tagName:'li',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			this.view = options.view;
		},
		render:function(){
			this.$el.html('<a href="javascript:;">' + this.model.get('alias') + '</a>');
			return this;
		},
		onClick:function(e){
			this.$el.addClass('active').siblings().removeClass('active');
			this.view[this.model.get('type')](this.model);
		}
	});

	var Tab = Backbone.View.extend({
		tagName:'ul',
		className:'nav nav-pills',
		initialize:function(options){
			this.view = options.view;
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			return this;
		},
		renderItem:function(model){
			var item = new Item({
				model:model,
				view:this.view,
				attributes:{
					role:'presentation'
				}
			});
			this.$el.append(item.render().el);
		}
	});

	var Nested = Base.extend({
		tplId:'tpl-view-nested',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.parent = options.parent
			this.level = options.nestedLevel ? this.nestedLevel + 1 : 1;
		},
		events:{
			'click .rb-back':'exit'
		},
		render:function(){
			this.parent.hide();
			Base.prototype.render.apply(this, arguments);
			this.tab();
			var _this = this;
			setTimeout(function(){
				_this.setBodyHeight();
			}, 50);
			return this;
		},
		tab:function(){
			var schema = _.where(this.parent.model.get('schema').attributes, {type:'collection'});
			schema.unshift({alias:'详细内容', type:'details'});
			var tab = new Tab({
				collection: new Backbone.Collection(schema),
				view:this
			}).render();
			this.$('.rb-tab').html(tab.el);
			this.$('.rb-tab>ul>li').first().click();
		},
		details:function(){
			var schema = _.reject(this.parent.model.get('schema').attributes, function(o){
				return this.idName === o.name 
				|| (o.hidden && ['all'].indexOf(o.hidden) >= 0)
				|| o.type === 'collection'
				|| o.type === 'model';
			}, this);
			schema = this.parent.schemaFilter(schema);
			var details = new Details({
				model:this.model,
				collection:new Backbone.Collection(schema)
			}).render();
			this.$('.rb-subview').html(details.el);
		},
		collection:function(model){
			var view = new rainbow.ViewModel;
			view.$body = this.$('.rb-subview');
			var idName = this.parent.idName;
			view.url = this.parent.model.url + '/' + this.model.get(idName) + '/' + model.get('name');
			setTimeout(function(){
				view.request();
			}, 100);
		},
		exit:function(e){
			this.destroy();
			this.parent.show();
			e.stopPropagation();
			e.preventDefault();
		}
	});
	return Nested;
});