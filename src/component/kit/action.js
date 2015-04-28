define(function(require){
	var Base = require('./list');
	var Item = Base.Item.extend({
		tagName:'button',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			Base.Item.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.$el.appendTo('.rb-view-actions');
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
			return this;
		},
		renderItem:function(model, i){
			if(!this.view.getSelectedState(model.get('selected'))){
				return;
			}
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$el.append(item.render().el);
		}
	});

	return List;

});