define(function(require){
	var Base = require('./base');
	var Row = require('./row/schedule');
	var Table = require('./table');
	var moment = require('moment');
	var Day = Backbone.View.extend({
		className:'calendar-day',
		initialize:function(options){
			this.date = options.date;
			this.date = this.date ? moment(this.date) : this.date;
			this.weekly = options.weekly;
		},
		render:function(){
			var tpl = '<span><%=value%></span>';
			var weeklys = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
			var object = {};

			if(this.date){
				object.value = this.date.format('DD');
				this.$el.attr('data-date', this.date.format('YYYY-MM-DD'));
			}else{
				object.value = weeklys[this.weekly];
			}

			this.$el.html(_.template(tpl, object));

			if(this.date.day() === 0 || this.date.day() === 6){
				this.$el.addClass('muted');
			}
			return this;
		}
	});

	var Group = Backbone.View.extend({
		className:'calendar-row clearfix',
		initialize:function(options){
			this.isHead = options.isHead;
		},
		render:function(){
			var tpl = $('#tpl-list-calendar-row').html();
			this.$el.html(_.template(tpl));
			return this;
		}
	});

	var Calendar = Base.extend({
		className:'calendar',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.fixed = options.fixed;
			this.isHandle = options.isHandle;
			this.groups = {};
			this.startName = 'start_time';
			this.endName = 'end_time';
			this.weekFirst = 0;
			this.today = this.params.get(this.startName) ? moment(this.params.get(this.startName).split(',')[0]).valueOf() : null;
			this.today = this.today ? new Date(parseInt(this.today)) : new Date();
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
			var group = new Group({
				isHead:true
			}).render();
			for(var i = 0; i < 7 ; i++){
				new Day({weekly:i}).render().$el.appendTo(group.el);
			};
			this.$('.calendar-header').append(group.el);
		},
		body:function(){
			var first = moment(new Date(this.today.getTime()).setDate(1));
			var last = moment(new Date(this.today.getTime()).setDate(this.count));
			var firstly = first.day();
			var prepend = Math.abs(this.weekFirst - firstly);
			var start = first.clone().add(prepend, 'day');
			var group,date;
			for(var i = 0; i < 42; i++){
				date = first.clone().add(prepend, 'day');
				if(i % 7 == 0){
					group = new Group({
						start:date,
						end:date.clone().add(6, 'day')
					}).render();
					this.groups[Math.floor(i / 7)] = group;
				}
				this.renderDay(date.valueOf(), group.$el);
				prepend++;
			}

			this.collection.each(function(model, index){
				this.renderRow(model, index, start);
			}, this);
		},
		renderRow:function(model, index, startly){
			var start = moment(model.get(this.startName));
			var end = moment(model.get(this.endName));
			var index = (start.valueOf() - startly.valueOf())/24/3600000;
			index = index < 0 ? 0 : Math.floor(index / 7);
			var last = (end.valueOf() - startly.valueOf())/24/3600000;
			last = last > 41 ? 6 : Math.floor(last / 7) + 1;

			for(var i = index; i < last; i++){
				var row = new Row({
					model:model,
					columns:this.series,
					list:this
				});
				this.groups[i].$('.calendar-events').append(row.render().el);
				//this.position(row, this.groups[value]);
			}
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
			var color = row.model.get('sequence_no');
			var index = _.indexOf(this._colors, color);
			
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
	return Calendar;
});