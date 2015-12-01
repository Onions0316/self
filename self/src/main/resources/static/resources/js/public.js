//静态常量名
var userInfoStr = "userInfo";
var loginTimeKey = 'loginTime';

var url = '';
/**
 * 在所有DOM元素加载之前执行
 */
$(function () {
	url = document.location.href;
});

/**
 * 获取登录信息
 * @returns
 */
function getLoginInfo(){
	var info = getInfo(userInfoStr);
	if(info){
		var key = getKey();
		if(key==info.key){
			return info;	
		}
	}
	goLogin();
}

/**
 * 设置登录信息
 * @param obj
 */
function setLoginInfo(obj){
	setInfo(userInfoStr,obj);
}

/**
 * 注销
 */
function logout(){
	var info = getLoginInfo();
	if(info){
		removeInfo(userInfoStr);
		removeInfo(loginTimeKey);
	}
	goLogin();
}

/**
 * 回到登录页面
 */
function goLogin(){
	//top.location = 'login.html';
}

/**
 * 获取安全key
 * @returns
 */
function getKey(){
	return $.md5(navigator.userAgent);
}

/**
 * 获取本地存储信息
 * @param key
 * @returns
 */
function getInfo(key){
	var storage = getStorage();
	return JSON.parse(storage.getItem(key));
}

/**
 * 设置本地存储信息
 * @param key
 * @param value
 */
function setInfo(key,value){
	var storage = getStorage();
	storage.setItem(key, JSON.stringify(value));
}

/**
 * 删除本地设置信息
 * @param key
 */
function removeInfo(key){
	var storage = getStorage();
	storage.removeItem(key);
}

/**
 * 浏览器是否支持htmlStorage
 * @returns
 */
function getStorage(){
	var storage = window.sessionStorage;
	if(storage){
		return storage;
	}else{
		$(this).myalert({title:'提示',context:'浏览暂不支持htmlStorage,无法进入系统'});
	}
}

/**
 * 浏览器是否支持localStorage
 * @returns
 */
function getLocalStorage(){
	var storage = window.localStorage;
	if(storage){
		return storage;
	}else{
		$(this).myalert({title:'提示',context:'浏览暂不支持localStorage,无法记住密码'});
	}
}

/**
 * 跨域请求提交
 * @param operate 远程请求路径
 * @param data 远程请求数据
 * @param success 远程请求成功
 * @param error 远程请求失败
 */
function jsonpRequest(operate,data,success,error,complete){
	if(data){
		data.t = getTime();
	}
	$.ajax({
		url:centerPath+operate,
		data:data,
		dataType:"jsonp",
		success:function(data){
			if($.isFunction(success)){
				success(data);
			}
		},
		error:function(data){
			if($.isFunction(error)){
				error(data);
			}
		},
		complete:function(XHR,TS){
			if($.isFunction(complete)){
				complete(XHR,TS);
			}
		}
	})
}

/**
 * 获取url参数 (name 参数名),查询不到返回null
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var url = window.location.search.replace(/&amp;/gi,'&');
    var r = decodeURI(url).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
/**
 * 非空判断
 * @param value
 * @returns {Boolean}
 */
function isNotBlank(value) {
	if (value) {
		if (value.replace(/(^\s*)|(\s*$)/g, "")) { // 去除空格在判断
			return true;
		} else {
			return false;
		}
	}
	return false;
}

/**
 * 刷新当前页
 */
function refresh(){
	window.location.href = window.location.href;
}

function getTime(){
	return (new Date()).getTime();
}

/**
 * 日期格式化
 * @param format
 * @returns
 */
Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 

function logWrite(log){
	console.log(log);
}

/**
 * 设置千分位
 * @param num
 * @returns
 */
function setThousandChar(num){
	if(num){
	}else{
		num = 0;
	}
	num = num +'';
	return num.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
