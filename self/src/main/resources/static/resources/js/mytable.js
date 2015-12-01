(function($){
	var page;
	var pagesize;
	var total;
	var url;
	var parm;
	var fun ;
	var dbClick ;
	$.fn.myPlugin = function(options){
		
		//初始化 config
		run.options = $.extend(run.options, options);
		run.init(this);
		run.title(this);
		run.url(page,parm);
		return  run;
	}
	
	var run = {
			options:{
				checkbox:false,//是否显示选择框
				showIndex:false//是否显示序号
			},
			init:function($this){
				options = this.options;
				$this.css(
						{
						
						'min-height':'20px',
						//'height':$(window).height()-88-80,
						'margin': '0px auto',
						'margin-bottom' :'20px',
						'margin-left' :'0px',
						'border':'1px solid rgb(203,203,203)',
						//'box-shadow': '0 1px 2px #ECF5FF inset,0 -1px 0 #C4E1FF inset,0 -2px 3px #ECF5FF inset',
						//'background': '-webkit-linear-gradient(top,#ECF5FF,	#C4E1FF)',
						'border-radius': '3px',
						'padding':'5',
				});
				
				if(options.url){
					url = options.url;
				}
				if(options.pagesize){
					pagesize = options.pagesize;
				}
				if(options.page){
					page =options.page;
				}
				if(options.parm){
					parm =options.parm;
				}
				if(options.render){
					fun = options.render ;
				}
				if(options.dbClick){
					dbClick = options.dbClick ;
				}
			},
			title:function($this){
				options = this.options;
				var titles = [];
				if(options.columns){
					var table =  document.createElement("table");
					table.id="gird" ;
					table.className='tablelist';
					var tbody = document.createElement("tbody");
					tbody.id='tbody';
					tbody.style.overflow="scroll" ;
					var thead = document.createElement("thead");
					var tr = document.createElement("tr");
					thead.appendChild(tr);
					tr.align = "center" ;
					table.appendChild(thead); 
					table.appendChild(tbody); 
					$this[0].appendChild(table);
					var colCount = options.columns.length;
					if(options.checkbox){
						var checked_th = document.createElement("th");
						var checked_input =  document.createElement("input");
						checked_input.style.width = "35px" ;
						checked_input.id = "allcheck" ;
						checked_input.name = "allcheck" ;
						checked_input.type = "checkbox" ;
						checked_th.appendChild(checked_input);
						tr.appendChild(checked_th);	
						colCount ++;
					}
					if(this.options.showIndex){
						var th = document.createElement("th");
						th.innerHTML='序号';
						tr.appendChild(th);	
						colCount ++;
					}
					for(var i=0;i<options.columns.length;i++){
						var th = document.createElement("th");
						th.innerHTML=options.columns[i].display;
						th.style.width = 100 / colCount + "%";
						if(options.columns[i].width){
							th.style.width = options.columns[i].width ;
						}
						if(options.columns[i].align){
							th.align = options.columns[i].align ;
						}
						th.lab = options.columns[i].name ;	
						if(options.columns[i].sort){
							var _i = document.createElement("i");
							_i.className='sort';
							var img = document.createElement("img");
							img.src='images/px.gif';
							_i.appendChild=(img);
							th.appendChild(_i);
						}
						tr.appendChild(th); 
					}
				}
			},
			url:function(page){
				var datajson;
				var data = {page:page,pagesize:pagesize};
				if(parm){
					data = {page:page,pagesize:pagesize,filter:parm};
				}
				if(url){
					// 加载json 数据
					$.ajax({
						url: url,
						type:'get',
						async:false, 
						data:data,
						dataType:'json',
						success:function(data){
							datajson = data;
						},
						error:function(){
							console.log('error');
						}
					});
				}
				if(this.options.data){
					var start = (data.page-1)*data.pagesize;
					var end = data.page*data.pagesize;
					datajson = $.extend({}, this.options.data);
					datajson.Rows = datajson.Rows.slice(start,end);
				}
				run.show(datajson);
			},
			setParm : function(parms){
				if(parms){
					parm = parms ;
				}
			},
			reLoad : function(data){
				if(data){
					this.options.data = $.extend({}, data);
				}
				page = 1;
				run.url(page) ;
			},
			show:function(data){
				if(data){
	  				

					total = data.Total;

					var totalPage = total % pagesize == 0 ? total / pagesize : parseInt(total/ pagesize) + 1;
					var maxPage = this.options.maxPage;
					if(maxPage && totalPage>maxPage){
						totalPage = maxPage;
					}
					var offset =   pagesize * (page - 1);
					var beginpage = 1;
					var endpage = 10;

			 		if(parseInt(page) >= 7 )
			 		{
			 			beginpage=parseInt(page)-2;
			 			endpage = parseInt(page) +7;
			 		}
			 		if(endpage>=totalPage)
			 		{
			 			endpage=totalPage;
			 		}

					var totals = [] ;
					
					totals.push('<div class="message">共<i class="blue">'+total+'</i>条记录，当前显示第&nbsp;<i class="blue">'+page+'&nbsp;</i>页</div>');
					totals.push('');
					totals.push('<ul class="paginList">') ;
					totals.push('<li class="paginItem"><a href="javascript:;"><span class="pagepre"></span></a></li>') ;
					for(var j=beginpage;j<=endpage;j++){
						if(page == j){
							totals.push('<li class="paginItem current"><a href="javascript:;"  >'+j+'</a></li>') ;
						}else{
							totals.push('<li class="paginItem"><a href="javascript:;"  >'+j+'</a></li>') ;
						}
					}
					totals.push('<li class="paginItem"><a href="javascript:;"><span class="pagenxt"></span></a></li>') ;
					totals.push('</ul>') ;
					$(".pagin").html(totals.join("")) ;
					$(".pagin ul li").click(function(){
							var li_a = $(this).children().text() ;
							if(li_a==page){
								return ;
							}
							$("#allcheck").attr("checked",false);
							//上一页
							if($(this).index() == 0){
								console.log('上一页');
								if(page !=1)
								page--;

							}else
							//下一页
							if($(this).index() == $(".pagin ul li").length - 1){
								console.log('下一页');
								if(page !=endpage)
								page++;
							}else{
								page = $(this).text();

							}
						run.url(page,parm);
					});
					var tbody = $("#tbody") ;
					tbody.html("") ;
					var table_th =this.options.columns ;
					var context = [] ;
					for(var i=0;i<data.Rows.length;i++){
						if((i+1) % 2 ==0){
							context.push("<tr class='odd' align='center'>")
						}else{
							context.push("<tr align='center'>")
						}
						if(this.options.checkbox){
							context.push("<td><input type='checkbox' id='row"+data.Rows[i].id+"'/></td>")
						}
						if(this.options.showIndex){
							var index = (page-1)*pageSize + i +1;
							context.push("<td>"+index+"</td>");
						}
						for (var t = 0; t < table_th.length; t++) {
							for ( var j in data.Rows[i]) {
								if(j=='id'){
									continue ;
								}
								if(j == table_th[t].name){
									var dataValue = data.Rows[i][j];
									var formater = table_th[t].format;
									if($.isFunction(formater)){
										dataValue = formater(dataValue);
									}
									context.push("<td lab='row"+data.Rows[i].id+"' name='"+j+"'>" +dataValue +"</td>") ;
									continue ;
								}
							}
						}
						context.push("</tr>")
					}
					tbody.html(context.join("")) ;
					
					run.render() ;
					run.allcheck() ;
					run.dbClick() ;
					
				}
			},
			render : function(){
				if($.isFunction(fun)){
					fun(true) ;
				}
			},
			allcheck : function(){
				$("#allcheck").click(function(){
					var allcheck = $(this).attr('checked') ;
					if(allcheck){
						$("#tbody input").each(function(){
							$(this).attr("checked",true);
						})
					}else{
						$("#tbody input").each(function(){
							$(this).attr("checked",false);
						})
					}
				})
				$("#tbody td").click(function(){
					var inputId = $(this).attr("lab") ;
					$("#"+inputId).click() ;
					
					var count = 0 ;
					$("#tbody input").each(function(){
						if($(this).attr("checked")){
							count++ ;
						}
					}) ;
					$("#allcheck").attr("checked",false);
					if(count==$("#tbody input").length){
						$("#allcheck").attr("checked",true);
					}
				})
				
			},
			dbClick : function(){
				$("#tbody td").dblclick(function(){
					var row = {};
					row.id =  $(this).attr("lab").substring(3) ;
					if($.isFunction(dbClick)){
						dbClick(row) ;
					}
				})
			}
		
	}
	
	
})(jQuery)

