define(function(require){
	var Backbone = require('backbone');
	var Modal = require('./modal');
	return function(config, dashboard, View){
		var model = new Backbone.Model(config);
		var modal = new Modal({
			model:model
		});
		modal.render();
		var view = new View({
			model:model,
			dashboard:dashboard
		});
		view.render().$el.appendTo(modal.$('.modal-body'));
		modal.$el.on('hidden.bs.modal', function(e){
			view.trigger('remove');
		  view.remove();
		});
		setTimeout(function(){
			view.renderView();
		},500);
	}
});