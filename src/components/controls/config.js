define(function(require){
	var filter = require('../../utility/filter');
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
		select:{
			base:'select'
		},
		"select-tree":{
			base:'select',
			isTree:true,
			display:function(){
				
			}
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