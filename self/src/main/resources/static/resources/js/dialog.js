(function($){
	$.fn.mydialog = function(option){
		dialog.title = option.title?option.title:"温馨提示" ;
		dialog.context = option.context?option.context:"" ;
		dialog.show() ;
		dialog.click(option.click) ;
		return dialog ;
	}
	
	$.fn.myalert = function(option){
		alert.title = option.title?option.title:"温馨提示" ;
		alert.context = option.context?option.context:"" ;
		alert.show() ;
		alert.click(option.click) ;
		return alert ;
	}
	
	$.fn.mywarn = function(option){
		warn.title = option.title?option.title:"温馨提示" ;
		warn.context = option.context?option.context:"" ;
		warn.show() ;
		warn.click(option.click) ;
		return warn ;
	}
	
	var dialog = {
			title : "" ,
			context : "",
			show : function(){
				var d = [] ;
				d.push('<div class="tip">') ;
				d.push('<div class="tiptop"><span>'+dialog.title+'</span><a></a></div>') ;
				d.push('<div class="tipinfo">') ;
				d.push('<span><img src="images/question.png" witdh="80px" height="80px"/></span>') ;
				d.push('<div class="tipright">') ;
				d.push('<p>'+dialog.context+'</p>') ;
				d.push('<cite>如果 "是" 请点击确定按钮 ，否则请点取消。</cite>') ;
				d.push('</div></div>') ;
				d.push('<div class="tipbtn">') ;
				d.push('<input name="" type="button"  class="sure" value="确定" />') ;
				d.push('<input name="" type="button"  class="cancel" value="取消" />') ;
				d.push('</div></div>') ;
				$(document.body).append(d.join("")) ;
				$(".tip").show() ;
			},
			hide : function(){
				$(".tip").hide() ;
			},
			click : function(fun){
				$(".sure").click(function(){
					if($.isFunction(fun)){
						fun(true) ;
					}
					dialog.hide() ;
				})
				$(".cancel").click(function(){
					dialog.hide() ;
				})
				$(".tiptop a").click(function(){
					dialog.hide() ;
				})
			}
	}
	
	var alert = {
			title : "" ,
			context : "",
			show : function(){
				var d = [] ;
				d.push('<div class="alert">') ;
				d.push('<div class="tiptop"><span>'+alert.title+'</span><a></a></div>') ;
				d.push('<div class="tipinfo">') ;
				d.push('<span><img src="images/checkmark.png" witdh="80px" height="80px"/></span>') ;
				d.push('<div class="tipright">') ;
				d.push('<p>'+alert.context+'</p>') ;
				d.push('</div></div>') ;
				d.push('<div class="tipbtn">') ;
				d.push('<input name="" type="button"  class="alertsure" value="确定" />&nbsp;') ;
				d.push('</div></div>') ;
				$(document.body).append(d.join("")) ;
				$(".alert").show() ;
				
			},
			hide : function(){
				$(".alert").hide() ;
			},
			click : function(fun){
				$(".alertsure").click(function(){
					if($.isFunction(fun)){
						fun(true) ;
					}
					alert.hide() ;
				})
				$(".tiptop a").click(function(){
					alert.hide() ;
				})
			}
		}
	var warn = {
			title : "" ,
			context : "",
			show : function(){
				var d = [] ;
				d.push('<div class="alert">') ;
				d.push('<div class="tiptop"><span>'+warn.title+'</span><a></a></div>') ;
				d.push('<div class="tipinfo">') ;
				d.push('<span><img src="images/warn.png" witdh="80px" height="80px"/></span>') ;
				d.push('<div class="tipright">') ;
				d.push('<p>'+warn.context+'</p>') ;
				d.push('</div></div>') ;
				d.push('<div class="tipbtn">') ;
				d.push('<input name="" type="button"  class="alertsure" value="确定" />&nbsp;') ;
				d.push('</div></div>') ;
				$(document.body).append(d.join("")) ;
				$(".alert").show() ;
				
			},
			hide : function(){
				$(".alert").hide() ;
			},
			click : function(fun){
				$(".alertsure").click(function(){
					if($.isFunction(fun)){
						fun(true) ;
					}
					warn.hide() ;
				})
				$(".tiptop a").click(function(){
					warn.hide() ;
				})
			}
		}
})(jQuery)
