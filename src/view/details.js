define(function(require){
	var Details = Backbone.View.extend({
		tagName:'table',
		className:'table table-bordered',
		initialize:function(options){
			this.schema = options.schema;
		},
		render:function(){
			this.$el.append('<tbody></tbody>');
			_.each(this.schema, function(item){
				var title = item.alias ? item.alias : item.name;
				var value = this.model.get(item.name) ? this.model.get(item.name) : '';
				this.$('tbody')
				.append(
					'<tr><th width="160" style="background-color: #f9f9f9;">' 
					+ title + '</th><td style="background-color: #ffffff;">'
					+ value +'</td></tr>'
				);
			}, this);
			return this;
		}
	});
	return Details;
});