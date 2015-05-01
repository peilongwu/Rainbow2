define(function(require){
	var View = require('app/view');
	var Box = View.extend({
		className:'view view-box',
		template:_.template($('#tpl-view-panel').html()),
		initialize:function(options){
			this.dashboard = options.dashboard;
		}
	});
	return Box;
});