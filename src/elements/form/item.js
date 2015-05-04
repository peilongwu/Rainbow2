define(function(require){
	var Control = require('../control/controls');
	var Item = Backbone.View.extend({
		className:'form-group col-xs-12',
		initialize:function(options){
			this.form = options.form;
			this.control = null;
		},
		events:{
			'change input,textarea,select':'onChange',
			'change input[type=file]':'onFileChange',
			'blur input,textarea,select':'onChange'
		},
		render:function(){
			var tpl = '<label class="col-sm-2"><%=name%></label>';
			this.$el.html(_.template(tpl, this.model.toJSON()));
			this.renderControl();
			return this;
		},
		renderControl:function(type){
			this.control = new Control[type]({
				model:this.model,
				className:'form-control'
			});
			this.control.render().$el.appendTo(this.$el);
		},
		verify:function(){
			
		},
		display:function(){

		},
		filter:function(){

		},
		onChange:function(e){
			this.verify();
		},
		onFileChange:function(e){
			this.verify();
		},
		setValue:function(){

		},
		getValue:function(){
			
		}
	});
	return Item;
});