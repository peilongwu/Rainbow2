define(function(require){
	var Base = require('./base');
	var Input = Base.extend({
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
				placeholder: this.model.get('legend') ? this.model.get('legend') : this.title,
				value: this.model.get('value')
			};
		},
		render:function(){
			this.$el.attr(this.attributes);
			return this;
		}
	});

	return Input;
});