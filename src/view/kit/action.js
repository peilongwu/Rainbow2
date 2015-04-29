define(function(require){
	var Base = require('./list');
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
		form:function(){
			
		},
		modal:function(){
			
		},
		subView:function(){

		},
		side:function(){

		},
		openWindow:function(){

		},
		commit:function(){

		},
		request:function(){

		},
		cancel:function(){

		},
		refresh:function(){
			this.view.model.request();
		},
		getUrl:function(){

		},
		onClick:function(e){

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
		renderItem:function(model, i){
			if(!this.view.getSelectedState(model.get('selected'))){
				return;
			}
			model.get('group') && this.$el.append('<div class="btn-group" style="margin-right:10px;"></div>');
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$('.btn-group').last().append(item.render().el);
		}
	});

	return List;

});