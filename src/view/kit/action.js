define(function(require){
	var Base = require('./list');
	var Modal = require('../../utility/modal');
	var Form = require('../../elements/form/general');
	var Action = require('./action/action');
	var Item = Base.Item.extend({
		tagName:'button',
		className:'btn btn-default',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			Base.Item.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			var tpl = '<span class="glyphicon <%=icon%>" aria-hidden="true"></span> <%=name%>';
			this.$el.html(_.template(tpl, this.model.toJSON()))
			return this;
		},
		form:function(collection, model){
			var form = new Form({
				collection:collection,
				model:model
			}).render();
			form.model.url = this.view.model.url;
			var modal = this.modal(form.el);
			modal.$('.rb-submit:not(.disabled)').on('click', function(e){
				form.onSubmit(e);
			});

			form.on('success',function(){
				this.view.collection.add([form.model]);
				modal.close();
			}, this)
			return this;
		},
		modal:function(content){
			var modal = new Modal({
				model: new Backbone.Model({
					title: this.model.get('legend') ? this.model.get('legend') : this.model.get('name')
				}),
				content:content,
				tpl:'#tpl-modal-form'
			});
			modal.render();
			return modal;
		},
		subview:function(){
			return this;
		},
		side:function(){
			return this;
		},
		openWindow:function(){
			return this;
		},
		commit:function(){
			return this;
		},
		request:function(){
			return this;
		},
		cancel:function(){
			return this;
		},
		refresh:function(){
			this.view.model.request();
		},
		getUrl:function(){
			
		},
		post:function(){
			this.form(
				new Backbone.Collection(this.view.createSchema),
				new this.view.Model
			);
		},
		put:function(){
			this.form(
				new Backbone.Collection(this.view.updateSchema),
				this.view.getActiveModel
			);
		},
		"delete":function(){
			this.view.getActiveModel.destroy();
		},
		extend:function(action){
			var _this = this;
			require(['../../js/action/' + action], function(action){
				action.apply(_this);
			});
		},
		onClick:function(e){
			if(this.model.get('extend')){
				return this.extend(this.model.get('extend'));
			}
			var method = this.model.get('method').toUpperCase();
			switch(method){
				case 'PUT':
					this.put();
					break;
				case 'DELETE':
					this['delete']();
					break;
				default:
					this.post();
					break;
			}
		}
	});

	var List = Base.List.extend({
		initialize:function(options){
			Base.List.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			this.view.$('.rb-action').append(this.el);
			return this;
		},
		addGroup:function(){
			this.$el.append('<div class="btn-group"></div>');
			return this;
		},
		renderItem:function(model, i){
			model.get('group') && this.addGroup();
			if(!this.view.getSelectedState(model.get('selected'))){
				return;
			}
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$('.btn-group').last().append(item.render().el);
		}
	});
	return List;

});