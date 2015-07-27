define(function(require){
	var Base = require('./list');
	var Modal = require('../../utility/modal');
	var Form = require('../../components/form/general');
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
			var tpl = '<span class="glyphicon" aria-hidden="true"></span> <%=name%>';
			this.$el.html(_.template(tpl, this.model.toJSON()))
			this.icon();
			this.model.get('primary') && this.primary();
			return this;
		},
		primary:function(){
			this.$el.addClass('btn-success');
			return this;
		},
		icon:function(){
			this.model.get('icon') && this.$('.glyphicon').addClass(this.model.get('icon'));
			return this;
		},
		form:function(collection, model){
			var form = new Form({
				collection:collection,
				model:model
			}).render();
			
			form.model.urlRoot = this.view.model.url;
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
			var model = this.view.getActiveModel();
			this.form(
				new Backbone.Collection(this.view.updateSchema),
				model
			);
		},
		"delete":function(){
			if(!confirm('确认要对选定的' + this.view.selecteds.length + '项数据执行【' + this.model.get('name') + '】操作？')){
				return;
			}
			var model = this.view.getActiveModel();
			model.urlRoot = this.view.model.url;
			model.destroy({
				success:function(model, response, options){
					rainbow.alert(response.content);
				},
				error:function(model, response, options){
					rainbow.alert(response.responseJSON.content);
				}
			});
		},
		action:function(key){
			if(!confirm('确认要对选定的' + this.view.selecteds.length + '项数据执行【' + this.model.get('name') + '】操作？')){
				return;
			}

			var data = this.view.getSelecteds();
			var idName = this.view.idName;
			var url = this.view.model.url + '/' + key;

			data = _.map(data, function(item){
				var attr = {};
				attr[idName] = item[idName];
				return attr;
			});
			
			$.ajax(url, {
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
				type: this.model.get('method') ? this.model.get('method') : 'POST',
			})
			.success(function(response, options){
				rainbow.alert(response.content);
			})
			.error(function(response, options){
				rainbow.alert(response.responseJSON.content);
			});
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

			if(this.model.get('key')){
				return this.action(this.model.get('key'));
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
			this.view.$('.rb-action').empty().append(this.el);
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