define(function(require){
	var view = require('./view');
	var Model = Backbone.Model.extend({
		idAttribute:'id',
		initialize:function(options){
			this.res = null;
		},
		request:function(res){
			this.res = res;
			var that = this;
			this.fetch({
				success:function(model, response, options){
					model.display();
				},
				error:function(){
					rainbow.alert('访问服务器失败');
				}
			});
		},
		display:function(){
			var type = this.get('type');
			type = type ? type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase() : 'General';
			var v = new view[type]({
				model:this,
				res:this.res,
				coms:view
			});
			rainbow.layout.$('.main-body').empty().append(v.el);
			rainbow.current = v;
		}
	});
	return Model;
});