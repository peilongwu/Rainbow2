define(function(require){
	var view = require('./view');
	var Model = Backbone.Model.extend({
		idAttribute:'id',
		initialize:function(options){
			this.res = null;
			this.view = null;
		},
		request:function(res){
			this.res = res;
			var _this = this;
			this.fetch({
				success:function(model, response, options){
					model.display();
				},
				error:function(){
					rainbow.alert('访问服务器失败');
				}
			});
			return this;
		},
		display:function(){
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