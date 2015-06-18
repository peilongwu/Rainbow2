define(function(){
	var Select = Backbone.View.extend({
		tagName:'select',
		optionTpl:'<option value="<%=value%>"><%=name%></option>',
		initialize:function(options){
			
		},
		render:function(){
			if(this.model.get('isNull')){
				this.addEmptyOption();
			}
			return this;
		},
		addEmptyOption:function(){

		},
		addGroup:function(){

		},
		renderOption:function(){
			return this;
		},
		selected:function(value){
			this.$('option[value="' + value + '"]').attr('selected', true);
			return this;
		}
	});

	return Select;
});