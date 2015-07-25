define(function(require){
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
			type:'date',
			display:function(){

			}
		},
		datetime:{
			base:'input',
			type:'datetime',
			display:function(){

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
			type:'file'
		},
		hidden:{
			base:'input',
			type:'hidden'
		},
		textarea:{
			base:'textarea'
		},
		chosen:{
			base:'select',
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.css('width','300').select2({
					  theme: "classic"
					});
				}, 50)
			}
		},
		multiple:{
			base:'select',
			multiple:'multiple',
			display:function(){
				var _this = this;
				setTimeout(function(){
					_this.$el.css('width','300').select2({
					  theme: "classic"
					});
				}, 50)
			}
		}
	};
});