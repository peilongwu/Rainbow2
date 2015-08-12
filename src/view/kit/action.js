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
			if(this.model.get('key')){
				form.model.url = this.view.model.url + '/' + this.model.get('key');
			}else{
				form.model.urlRoot = this.view.model.url;
			}
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
					title: this.model.get('legend') ? this.model.get('legend') : this.model.get('name'),
					type:'modal-sm'
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
		listFilter:function(schema){
			var list = this.model.get('list');
			if(list){
				list = list.split(',');
				schema = _.filter(schema, function(item){
					return _.indexOf(list, item.name) >= 0;
				});
			}
			return schema;
		},
		one:function(){
			this.batch(1);
		},
		batch:function(num){
			var len = this.view.selecteds.length;
			if(num && len > num){
				return alert('Selected items can not be superfluous ' + num);
			}

			var confirmText = 'Confirm the selected ' 
			+ len + ' items to【' + this.model.get('name') + '】operate?';

			if(!confirm(confirmText)){
				return;
			}

			this.action(this.view.model.url + '/' + this.model.get('key'));
		},
		post:function(){
			this.form(
				new Backbone.Collection(this.listFilter(this.view.createSchema)),
				new this.view.Model
			);
		},
		put:function(){
			var model = this.view.getActiveModel();
			this.form(
				new Backbone.Collection(this.listFilter(this.view.updateSchema)),
				model
			);
		},
		"delete":function(){
			if(!confirm('Confirm the selected ' + this.view.selecteds.length + ' items to【' + this.model.get('name') + '】operate?')){
				return;
			}
			this.action(this.view.model.url, true);
		},
		action:function(url, isIdArray){

			var data = this.view.getSelecteds();
			var idName = this.view.idName;

			if(isIdArray){
				data = _.pluck(data, idName);
			}else{
				data = _.map(data, function(item){
					var attr = {};
					attr[idName] = item[idName];
					return attr;
				});
			}
			
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
			require(['action/' + action], function(action){
				(typeof action === 'function') && action.apply(_this);
			});
		},
		onClick:function(e){
			var action = this.model.get('action');
			if(action && action.slice(0, 2) == 'e.'){
				return this.extend(action.slice(2));
			}

			if(action && this[action]){
				return this[action]();
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
		renderItem:function(model, index){
			(model.get('group') || index < 1) && this.addGroup();
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