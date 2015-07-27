define(function(require){
	var Base = require('./base');
	var Select = Base.extend({
		tagName:'select',
		optionTpl:'<option value="<%=value%>"><%=title%></option>',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			delete this.attributes.value;
			delete this.attributes.type;
		},
		render:function(){
			this.before();
			this.$el.attr(this.attributes);
			_.each(this.model.get('list'), this.renderOption, this)
			this.after();
			return this;
		},
		before:function(){
			this.model.get('isNull') && this.addEmptyOption();
			!this.model.get('required')
			 && this.model.get('isNull') !== false
			 && this.addEmptyOption();
			this.model.format && this.model.format.apply(this);
			return this;
		},
		after:function(){
			this.selected(this.model.get('value'));
			this.display && this.display.apply(this);
			return this;
		},
		addEmptyOption:function(){
			this.model.get('list').unshift({title:'(Null)', value:''});
			return this;
		},
		addGroup:function(){

		},
		renderOption:function(item, index){
			this.$el.append(_.template(this.optionTpl, item));
			if(item._childList){
				
			}
			return this;
		},
		selected:function(value){
			this.$('option[value="' + value + '"]').attr('selected', true);
			return this;
		}
	});

	return Select;
});