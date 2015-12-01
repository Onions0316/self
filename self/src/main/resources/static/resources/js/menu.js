(function($){
	
	
	$.fn.tree = function(option){
		
		console.log(option);

		
		if(option.url){
			tree.setUrl(option.url) ;
		}
		if(option.data){
			tree.setData(option.data) ;
		}
		tree.getData() ;
		tree.show(this) ;
		return tree ;
	}
	
	var tree = {
		url: '',
		data :[],
		setData : function(data){
			tree.data = data ;
		},
		getData : function(){
			if(tree.url){
			}
			if(tree.data.length>0){
				
			}
			return tree.data ;
		},
		setUrl : function(url){
			tree.url = url ;
		},
		/*
		show : function(s){
			var treeDate = tree.data ;
			var reTree = [] ;
			for (var i = 0; i < treeDate.length; i++) {
				reTree.push('<dd>') ;
				reTree.push('<div class="title">') ;
				reTree.push(' <span><img src="'+treeDate[i].icon+'" height=18px width=18px /></span>'+treeDate[i].title) ;
				reTree.push('</div>') ;
				if(treeDate[i].children != undefined){
					tree.setMenu(treeDate[i].children,reTree) ;
				}
				reTree.push('</dd>') ;
			}
			s.html(reTree.join("")) ;
			$(".menuson li").click(function(){
				$(".menuson li.active").removeClass("active")
				$(this).addClass("active");
			});
			$('.title').click(function(){
				var $ul = $(this).next('ul');
				$('dd').find('ul').slideUp();
				if($ul.is(':visible')){
					$(this).next('ul').slideUp();
				}else{
					$(this).next('ul').slideDown();
				}
			});
		},*/
		show:function($this){

			var treeDate = tree.data ;
			var reTree = [] ;
			for (var i = 0; i < treeDate.length; i++) {
			reTree.push('<li><a href="#" ref="xtgl">系统管理</a></li>') ;
			reTree.push('<ul show="true">') ;
			reTree.push('<li><a href="#" ref="yhgl">用户管理</a></li>') ;
			reTree.push('<li><a href="#" ref="rzck">日志查看</a></li>') ;
			reTree.push('</ul>') ;

			}
			$this.html(reTree.join("")) ;

			
		},
		setMenu :function(data,reTree){
			if(data.length>0){
				reTree.push('<ul class="menuson">') ;
				for (var j = 0; j < data.length; j++) {
					reTree.push('<li><cite></cite><a href="'+data[j].src+'" target="rightFrame">'+data[j].title+'</a><i></i></li>') ;
				}
				reTree.push('</ul">') ;
				if(data.children){
					tree.setMenu(data[j].children,reTree) ;
				}
			}
		},
		reload :function(){
			tree.getData() ;
			tree.show(this) ;
		}
	}
})(jQuery)