define(function(require){
	var filter = require('../../utility/filter');
	var moment = require('moment');
	return {
		text:{
			base:'input',
			type:'text'
		},
		password:{
			base:'input',
			type:'password'
		},
		email:{
			base:'input',
			type:'email'
		},
		number:{
			base:'input',
			type:'number'
		},
		url:{
			base:'input',
			type:'url'
		},
		date:{
			base:'input',
			type:'text',
			format:function(){
				this.model.get('value') 
				&& (this.attributes.value = filter.time(this.model.get('value'), true, true));
			},
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.datetimepicker({
						language:  'zh-CN',
						format: 'yyyy-mm-dd',
						weekStart: 1,
						todayBtn:  1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						minView: 2,
						forceParse: 0
					});
				}, 50);
			}
		},
		datetime:{
			base:'input',
			type:'text',
			format:function(){
				this.model.get('value') 
				&& (this.attributes.value = filter.time(this.model.get('value'), true));
			},
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.datetimepicker({
						language:  'zh-CN',
				    format: 'yyyy-mm-dd hh:ii',
				    weekStart: 1,
		    		todayBtn:  1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						forceParse: 0,
		    		showMeridian: 1
					});
				}, 50);
			}
		},
		monthly:{
			base:'input',
			type:'hidden',
			display:function(){
				var _this = this;
				var $group = $($('#tpl-control-monthly').html());
				var $prev = $group.find('.left');
				var $next = $group.find('.right');
				var $mid = $group.find('.mid');
				var monthly;
				if(this.model.get('value')){
					monthly = moment(this.model.get('value').split(',')[0]);
				}else{
					monthly = moment();
				}

				$mid.text(monthly.format('MMM') + ' ' + monthly.format('YYYY'));

				$group.find('.btn').on('click',function(e){
					$t = $(this);
					if($t.hasClass('left')){
						monthly = monthly.add(-1, 'month');
					}else if($t.hasClass('right')){
						monthly = monthly.add(1, 'month');
					}else{
						monthly = moment(_this.model.get('value').split(',')[0]);
					}
					$mid.text(monthly.format('MMM') + ' ' + monthly.format('YYYY'));
					var values = [
						monthly.format('YYYY-MM-DD'),
						monthly.clone().add(1, 'month').add(-1, 'day').format('YYYY-MM-DD')
					];
					_this.$el.val(values.join(',')).trigger('change');
				});

				this.$el.hide();
				setTimeout(function(){
					_this.$el.after($group);
					//_this.$el.prev('label').hide();
				}, 50);
			}
		},
		'button-group':{
			base:'select',
			display:function(){
				var _this = this;
				var $group = $('<div class="btn-group" role="group" style="margin:0 0 5px 8px;"></div>');
				var $options = this.$('option');
				$options.each(function(index, el){
					var $el = $(el);
					var $btn = $('<button type="button" class="btn btn-default"></button>');
					var title = $el.text();
					title = title == '(Null)' ? 'All' : title;
					$btn.text(title);
					$btn.data('value', $el.val());
					_this.model.get('value') == $btn.data('value') && $btn.addClass('btn-success');
					$group.append($btn);
				});

				$group.find('.btn').on('click',function(e){
					$t = $(this);
					var value = $t.data('value');
					_this.$('option:not([value="' + value + '"])').removeAttr('selected');
					_this.$('option[value="' + value + '"]').attr('selected', true).trigger('change');
					$t.siblings().removeClass('btn-success');
					$t.addClass('btn-success');
				});

				this.$el.hide();
				setTimeout(function(){
					_this.$el.after($group);
					_this.$el.prev('label').hide();
				}, 50);
			}
		},
		select:{
			base:'select'
		},
		checkbox:{
			base:'input',
			type:'checkbox',
			display: function(){
				var metaType = this.model.get('metaType');
				if(metaType && metaType === 'Boolean'){
					this.$el.val(1);
					this.model.get('value') && this.$el.attr('checked', true);
				}
			}
		},
		radio:{
			base:'input',
			type:'radio'
		},
		file:{
			base:'input',
			type:'file',
			display: function(){

			}
		},
		hidden:{
			base:'input',
			type:'hidden'
		},
		textarea:{
			base:'textarea'
		},
		editor:{
			base:'textarea',
			display: function(){
				this.$el.hide().css('height',300).css('width',420);
				var _this = this;
				setTimeout(function(){
					_this.editor = KindEditor.create('textarea[name="' + _this.model.get('name') + '"]', {
						resizeType : 1,
						minWidth:'450px',
						allowPreviewEmoticons : false,
						allowImageUpload : false,
						items : [
							'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
							'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
							'insertunorderedlist', '|', 'image', 'link', '|', 'fullscreen']
					});
				},200);
			}
		},
		chosen:{
			base:'select',
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.css('width','260').select2({
					  theme: "classic"
					});
				}, 10);
			}
		},
		multiple:{
			base:'select',
			multiple:'multiple',
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.css('width','260').select2({
					  theme: "classic"
					});
				}, 10);
			}
		}
	};
});