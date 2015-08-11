define(function(require){
	var Details = Backbone.View.extend({
		tagName:'div',
		className:'details content-body',
		initialize:function(options){
			this.schema = options.schema;
		},
		render:function(){
			this.$el.append('<table class="table table-bordered"><tbody></tbody></table>');
			this.collection.each(function(model){
				var title = model.get('alias') ? model.get('alias') : model.get('name');
				var value = this.model.get(model.get('name')) ? this.model.get(model.get('name')) : '';
				var cell = {model:model};
				model.get('format') && (value = model.get('format').apply(cell, [value]));
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