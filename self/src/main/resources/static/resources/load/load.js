// JavaScript Document

$(function(){
		$("body").append('<div class="loading"><img src="resources/load/img/load.gif" width="100%"></div>') ;
	    $(".loading").css({
	      position:'absolute',
	      left:($("body").width() - $(".loading").outerWidth())/2,
	      top:($("body").height() - $(".loading").outerHeight())/2 + $(document).scrollTop()
	    });
})

function loadShow(){
	
	$(".loading").show();
 }

function loadHide(){
	$(".loading").hide();
}
