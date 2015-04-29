define(function(require){
	var view = require('./view');
	var Model = Backbone.Model.extend({
		idAttribute:'id',
		initialize:function(options){
			this.res = null;
			this.view = null;
			this.filter = new Backbone.Model;
			this.filter.on('change', this.request, this);
		},
		request:function(res){
			this.res = res ? res : this.res;
			var _this = this;
			this.fetch({
				success:function(model, response, options){
					model.display();
				},
				error:function(model, response, options){
					var error = response.responseJSON;
					if(error && error.type === 'unauthorized'){
						alert(error.content);
						return rainbow.route('signin', {trigger: true});
					}
					rainbow.alert('REQUEST_ERROR');
				},
				data:_.extend(
					this.filter.toJSON(),
					{_time:new Date().getTime()}
				)
			});
			return this;
		},
		display:function(){
			!this.view && this.createView();
			this.view.render();
			return this;
		},
		createView:function(){
			var type = this.get('type') ? null : null;
			type = type 
				? type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase() 
					: 'Standard';
			var v = new view[type]({
				model:this,
				res:this.res,
				coms:view
			});
			rainbow.layout.$('.rb-body').empty().append(v.el);
			rainbow.current = v;
			this.view = v;
			return this;
		}
	});
	return Model;
});