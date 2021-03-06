define(function(require){
	var Base = require('./base');
	var Kit = {
		Action:require('./kit/action'),
		Filter:require('./kit/filter'),
	};
	var Pagination = require('./kit/pagination')
	var Table = require('../components/list/table');
	var Schedule = require('../components/list/schedule');
	var filter = require('../utility/filter');
	var Nested = require('./nested');

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
			this.Collection = Backbone.Collection.extend({
				model:this.Model
			});
			this.collection =  new this.Collection;
			this.collection.on('add',function(){
				this.update();
			}, this);
			this.collection.on('remove',function(){
				this.selecteds.reset();
				this.update();
				this.updateAction();
			}, this);
			this.collection.on('change:_selected', function(model, value){
				value && this.selected(model);
				value || this.unselected(model);
				this.$('.rb-status-selected').text(this.selecteds.length);
			}, this);
			this.collection.on('change:_details', function(model, value){
				model.unset('_details', {silent:true});
				this.details(model);
			}, this);
			this.selecteds = new Backbone.Collection;
			this.model.get('handle') && this.handle();
			this.createSchema = _.filter(this.model.get('schema').attributes, function(o){
				return (o.access == 'write' || o.access == 'createonly') && o.system === 'none';
			}, this);
			this.updateSchema = _.filter(this.model.get('schema').attributes, function(o){
				return (o.access == 'write' || o.access == 'updateonly') && o.system === 'none';
			}, this);
			this.kits = {
				//breadcrum:'breadcrum',
				Action:this.model.get('actions'),
				Filter:this.model.get('schema').filters
			};
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
			var page = this.model.get('data').pagination;
			var stateTpl = 'Current <%=first%> - <%=end%> items , selected <span class="rb-status-selected"> <%=selected%> </span> items , total <%=count%> items';
			var first = page ? page.size * (page.current-1) + 1 : 1;
			var count = this.model.get('data').count;
			var end = page ? first + page.size - 1 : count;
			end = end > count ? count : end;
			var status = {
				first:first,
				end:end,
				selected:this.selecteds.length,
				count:count
			}
			this.$('.rb-status').empty();
			stateTpl = count ? stateTpl : 'Current 0 items';
			this.$('.rb-status').html(_.template(stateTpl, status));
			return this;
		},
		schemaFilter:function(schema){
			schema = _.map(schema, function(o){
				if(o.list){
					o.format = filter['enum'];
				}else if(o.dataType === 'wordbook'){
					o.format = filter['wordbook'];
				}else if(o.dataType === 'date'){
					o.format = filter['date'];
				}else if(o.metaType === 'Time'){
					o.format = filter['time'];
				}else if(o.name === this.idName){
					o.format = filter['id'];
				}else if(o.display === 'title'){
					o.format = filter['title'];
				}
				return o;
			}, this);
			return schema;
		},
		renderWidget:function(){

			var schema = _.reject(this.model.get('schema').attributes, function(o){
				return this.idName === o.name 
				|| (o.hidden && ['list','all'].indexOf(o.hidden) >= 0)
				|| o.type === 'collection'
				|| o.type === 'link'
				|| o.type === 'model';
			}, this);

			schema = this.schemaFilter(schema);

			var model = new Backbone.Model({
				series:schema,
				data:this.collection
			});

			var Widget = {
				Table:Table,
				Schedule:Schedule
			};

			var type = this.model.get('mode');

			if(type === 'schedule' && !this.widgetType){
				this.switchWidget();
			}else if(!this.widgetType){
				this.widgetType = 'Table';
			}

			var widget = new Widget[this.widgetType]({
				model:model,
				view:this,
				isHandle:this.isHandle,
				isTree:!!this.model.get('schema').parentIdName,
				params:this.model.filter
			});
			this.$('.rb-content-header').empty();
			widget.render().$el.appendTo(this.$('.rb-content-body-list').empty());
			this.widget = widget;
			this.setBodyHeight();
		},
		switchWidget:function(){
			var _this = this;
			var $switchel =  this.$('.rb-switch-widget');
			$switchel.show();
			this.widgetType = 'Schedule';
			$switchel.find('.btn').on('click', function(){
				$t = $(this);
				$t.siblings().removeClass('btn-success');
				$t.addClass('btn-success');
				if('schedule' === $t.data('value')){
					_this.widgetType = 'Schedule';
				}else{
					_this.widgetType = 'Table';
				}
				_this.update();
			});
		},
		setting:function(){

		},
		details:function(model){
			var details = new Nested({
				coms: this.coms,
				parent:this,
				model:model
			});
			details.render();
			this.$el.after(details.el);
		},
		setCollection:function(){
			this.selecteds.reset();
			this.collection.reset(this.model.get('data').collection);
			return this;
		},
		selected:function(model){
			this.selecteds.add(model);
			this.updateAction();
		},
		unselected:function(model){
			this.selecteds.remove(model);
			this.updateAction();
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
			return this.selecteds.toJSON();
		},
		update:function(){
			this.updateAction();
			this.pagination();
			this.renderWidget();
			var _this = this;
			setTimeout(function(){
				_this.setBodyHeight();
			}, 30);
			return this;
		},
		updateAction:function(){
			this.renderKitItem('Action', this.kits.Action);
			this.setBodyHeight();
			return this;
		},
		error:function(){
			
		}
	});
	return Standard;
});