define(function(require){
	var Input = Backbone.View.extend({
		tagName:'input',
		initialize:function(options){
			this.form = options.form;
			this.type = options.type ? options.type : this.model.get('control');
			this.title = this.model.get('alias') 
				? this.model.get('alias') 
					: this.model.get('name');
			this.attributes = {
				type: this.type,
				name: this.model.get('name'),
				placeholder: this.model.get('legend') ? this.model.get('legend') : this.title
			};
		},
		render:function(){
			return this;
		}
	});
});