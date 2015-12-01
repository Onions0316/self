var companyKey = '#companyId';
var orderKey = '#order';
var tableKey = '#tablediv';
var searchKey = '#searchbut';
var exportKey = '#export';
var pageSize = 25;
var maxPage = 4;
var totlePageSize = pageSize*maxPage;
var defaultPage = 0;
var defaultOrder = 0;
var tableObj = null;
var userCompanyId = null;
var isRoot = true;
var listUserName = '';
var listUserId = '';
var listCompanyName = null;
$(function(){
	loadShow();
	var info = getLoginInfo();
	if(info){
		listUserName = info.userName;
		listUserId = info.userId;
		userCompanyId = info.companyId;
		//分公司用户
		if(userCompanyId){
			listCompanyName = info.companyName;
			isRoot = false;
			$(companyKey).parent().append('<span id="companyName">'+info.companyName+'</span>');
			$(companyKey).remove();
			$('#companyName').css({
				'margin-top':'8px'
			});
		}

		setTimeout(load, 1000);
	}
	$(".select2").uedSelect({
		width : 167
	});
	$(searchKey).click(function(){
		var companyId = userCompanyId;
		if(isRoot){
			companyId =	$(companyKey).val();	
		}
		var order = $(orderKey).val();
		loadList(order,companyId);
	});
	$(exportKey).click(function(){
		var msg = listUserName+'按'+$(orderKey+' option:selected').text()+'排序导出';
		if(isRoot){
			msg+=$(companyKey+' option:selected').text();
		}else{
			msg+=listCompanyName;
		}
		msg+='的名片';
		postBehavior(listUserName,listUserId,msg);
		//生成导出url
		var url = centerPath+'admin/exportData';
		var companyId = userCompanyId;
		if(isRoot){
			companyId =	$(companyKey).val();	
		}
		var param = '';
		if(companyId){
			param = 'companyId='+companyId+'&';
		}
		var order = $(orderKey).val();
		if(order){
			param += 'order='+order;
		}
		url += '?'+param;
		$('#exportUrl').attr('href',url);
		document.getElementById("exportUrl").click();
	});
})
function load(){
	//公司加载
	if(isRoot){
		var companyStr = '';
		jsonpRequest('admin/company',{},function(data){
			if(data.data){
				companyStr+='<option value="">所有</option>';
				for(var i=0;i<data.data.length;i++){
					var com = data.data[i];
					companyStr+='<option value="'+com.key+'">'+com.value+'</option>';
				}
			}
		},function(data){
			companyStr = '<option value="0">网络异常,数据加载失败</option>';
		},function(data){
			$(companyKey).empty();
			$(companyKey).append(companyStr);
			$(companyKey).find('option:eq(0)').attr('selected',true);
			$(companyKey).change();
			//数据加载
			loadList(defaultOrder,userCompanyId);
		})
	}else{
		//数据加载
		loadList(defaultOrder,userCompanyId);
	}
	//排序加载
	var orderStr = '';
	jsonpRequest('admin/order',{},function(data){
		if(data.data){
			for(var i=0;i<data.data.length;i++){
				var com = data.data[i];
				orderStr+='<option value="'+com.key+'">'+com.value+'</option>';
			}
		}
	},function(data){
		orderStr = '<option>网络异常,数据加载失败</option>';
	},function(data){
		$(orderKey).empty();
		$(orderKey).append(orderStr);
		$(orderKey).find('option:eq(0)').attr('selected',true);
		$(orderKey).change();
	})
}

function emptyShow(value){
	if(!isNotBlank(value)){
		value = '无';
	}
	return value;
}

function loadList(order,companyId){
	loadShow();
	var tableData = {};
	var param = {};
	if(companyId){
		param.companyId = companyId;
	}
	param.size = totlePageSize;
	param.order = order;
	param.page = defaultPage;
	jsonpRequest('admin/cardListData',param,function(data){
		var msg = listUserName+'按'+$(orderKey+' option:selected').text()+'排序查询';
		if(isRoot){
			msg+=$(companyKey+' option:selected').text();
		}else{
			msg+=listCompanyName;
		}
		msg+='的名片';
		postBehavior(listUserName,listUserId,msg);
		var result = data.data;
		if(result){
			tableData.Rows = result;
			tableData.Total = data.total;
		}
	},function(data){
	},function(data){
		if(tableObj){
			tableObj.reLoad(tableData);
		}else{
			tableObj = $(tableKey).myPlugin({
				columns : [ {display : '姓名',name : 'name',format:emptyShow}, 
				            {display : '所属公司',name : 'companyName',format:emptyShow}, 
				            {display : '工号',name : 'clerkId',format:emptyShow}, 
				            {display : '点赞数',name : 'approves',format:setThousandChar},
				            {display : '浏览量',name : 'views',format:setThousandChar},  
				            {display : '分享数',name : 'shares',format:setThousandChar}
				           ],
				page : 1,
				pagesize : pageSize,
				maxPage :maxPage,
				data:tableData,
				showIndex:true
			});
		}
		loadHide();
	})
}