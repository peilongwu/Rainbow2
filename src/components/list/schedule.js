define(function(require){
	var Base = require('./base');
	var Row = require('./row/schedule');
	var Table = require('./table');
	var moment = require('moment');
	var Day = Backbone.View.extend({
		className:'schedule-day',
		initialize:function(options){
			this.date = options.date;
		},
		render:function(){
			var tpl = '<span><%=day%></span><span><%=weekly%></span>';
			var weeklys = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
			var object = {
				day:this.date.getDate(),
				weekly:weeklys[this.date.getDay()]
			};
			this.$el.html(_.template(tpl, object));
			this.$el.attr('data-date', moment(this.date).format('YYYY-MM-DD'));
			if(this.date.getDay() === 0 || this.date.getDay() === 6){
				this.$el.addClass('muted');
			}
			return this;
		}
	});

	var Group = Backbone.View.extend({
		className:'schedule-row clearfix',
		initialize:function(options){
			this.isHead = options.isHead;
		},
		render:function(){
			var tpl = $('#tpl-list-schedule-row').html();
			this.$el.html(_.template(tpl));
			var title = this.model.get('_value');
			var format = this.model.get('format');
			title = !this.isHead && format ? format.apply(this, [title, null, true]) : title;
			this.$('.schedule-title').html(title);
			return this;
		}
	});

	var Schedule = Base.extend({
		className:'schedule',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.fixed = options.fixed;
			this.isHandle = options.isHandle;
			this.groups = {};
			this.colorName = 'sequence_no';
			this.startName = 'start_time';
			this.endName = 'end_time';
			this.today = this.params.get(this.startName) ? moment(this.params.get(this.startName).split(',')[0]).valueOf() : null;
			this.today = this.today ? new Date(this.today) : new Date();
			this.series = this.model.get('series');
			this.collection = this.model.get('data');
			this.group = new Backbone.Model(_.findWhere(this.series, {display:'title'}));
			this.month = this.today.getMonth() + 1;
			this.year = this.today.getFullYear() + 1;
			this.$days = null;
			this.colors = ['#ff8800', '#8800cc', '#0088ff', '#008800'];
			this._colors = [];
			this.count = (new Date(this.today.getTime()).setMonth(this.month , 1) - new Date(this.today.getTime()).setDate(1))/24/60/60/1000;
		},
		render:function(){
			this.$el.html($('#tpl-list-schedule').html());
			this.$el.width(this.count * 45 + 122);
			this.update();
			return this;
		},
		header:function(){
			var model = this.group;
			model.set('_value', this.group.get('alias'));
			var group = new Group({
				model:model,
				isHead:true
			}).render();
			for(var i = 0; i < this.count ; i++){
				this.renderDay(new Date(this.today.getTime()).setDate(i + 1), group.$('.schedule-days'));
			};
			this.$days = group.$('.schedule-days').clone();
			this.$days.find('.schedule-day').html('<span></span>');
			this.$('.schedule-header').append(group.el);
		},
		body:function(){
			this.collection.each(this.renderRow, this);
		},
		renderRow:function(model){
			var value = model.get(this.group.get('name'));
			if(!this.groups[value]){
				this.addGroup(value);
			}
			var row = new Row({
				model:model,
				columns:this.series,
				list:this
			});
			this.groups[value].$('.schedule-events').append(row.render().el);
			this.position(row, this.groups[value]);
		},
		addGroup:function(value){
			var model = this.group;
			model.set('_value', value);
			var group = new Group({
				model:model
			}).render();
			group.$('.schedule-days').append(this.$days.html());
			this.$('.schedule-list').append(group.el);
			this.groups[value] = group;
		},
		position:function(row, group){
			var month = new Date(row.model.get(this.startName)).getMonth() + 1;
			if(month !== this.month){
				row.$el.remove();
				return;
			}
			var start = new Date(row.model.get(this.startName)).getDate();
			var end = new Date(row.model.get(this.endName)).getDate();
			var left = 120 + (start - 1) * 45;
			var width = (end - start + 1) * 45 - 1;
			var color = row.model.get(this.colorName);
			var index = _.indexOf(this._colors, color);
			
			//init
			if(index < 0){
				index = this._colors.push(color) - 1;
			}

			row.$('.rb-title').parent().remove();
			row.$el.css({
				left:left,
				width:width,
				'background-color':this.colors[index]
			});
		},
		copyHeader2:function(){
			var $schedule = $('<div class="schedule"></div>')
			var $header = this.$('.schedule-header').clone();
			this.$el.css('margin-top', - this.$('.schedule-header').height() - 1);
			$schedule.width(this.$el.outerWidth());
			$schedule.append($header);
			return $schedule;
		},
		renderDay:function(date, $container){
			var day = new Day({
				date:new Date(date)
			});
			$container.append(day.render().el);
		},
		update:function(){
			this.header();
			this.body();
		}
	});
	return Schedule;
});