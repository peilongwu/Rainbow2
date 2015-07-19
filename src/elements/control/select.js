define(function(require){
	var Base = require('./base');
	var Select = Base.extend({
		tagName:'select',
		optionTpl:'<option value="<%=value%>"><%=title%></option>',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			delete this.attributes.value;
		},
		render:function(){
			this.$el.attr(this.attributes);
			this.before();
			_.each(this.model.list, this.renderOption, this)
			this.after();
			return this;
		},
		before:function(){
			this.model.get('isNull') && this.addEmptyOption();
			this.model.format && this.model.format.apply(this);
			return this;
		},
		after:function(){
			this.selected(this.model.get('value'));
			this.model.display && this.model.display.apply(this);
			return this;
		},
		addEmptyOption:function(){
			this.model.list.unshift({title:'(NULL)', value:''});
			return this;
		},
		addGroup:function(){

		},
		renderOption:function(item, index){
			this.$el.append(_.template(this.optionTpl, item));
			return this;
		},
		selected:function(value){
			this.$('option[value="' + value + '"]').attr('selected', true);
			return this;
		}
	});

	return Select;
});