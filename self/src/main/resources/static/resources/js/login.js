var saveUserInfoKey = 'bcUser';
var local = null;
var remember = null;
$(function() {
	local = getLocalStorage();
	if(local){
		remember =JSON.parse(local.getItem(saveUserInfoKey));
		if(remember){
			$("#code").val(remember.userName);
			$("#pwd").val(remember.password);	
		}
	}
	else{
		$('#remember').attr('checked',false);
		$('#rememberDom').hide();
	}
	$('.loginbox').css({
		'position' : 'absolute',
		'left' : ($(window).width() - 692) / 2
	});
	$('#code').change(function(){
		remember = null;
	});
	$('#pwd').change(function(){
		remember = null;
	});
	$(window).resize(function() {
		$('.loginbox').css({
			'position' : 'absolute',
			'left' : ($(window).width() - 692) / 2
		});
	})
	loadHide();
	$("#button").click(function() {
		var code = $("#code").val();
		var pwd = $("#pwd").val();
		if (code == '' || code == null) {
			show_err_msg('登录名不能为空');
			return;
		}
		if (pwd == '' || pwd == null) {
			show_err_msg('密码不能为空');
			return;
		}
		login();
	});
});

function login(){
	loadShow();
	var userName= $("#code").val();
	var pwd= $("#pwd").val().trim();
	if(remember){
	}else{
		pwd = jQuery.md5(pwd);
	}
	var param = {'userName':userName,'password':pwd};
	var msg = '';
	var result = null;
	window.location.href = 'main.html';
	/*jsonpRequest('admin/adminLogin',param,function(data){
		if(data.message){
			msg = data.message;
		}else{
			var remember = $('#remember:checked');
			if(remember.length>0){
				if(local){
					local.setItem(saveUserInfoKey,JSON.stringify(param));
				}
			}
			else{
				if(local){
					local.removeItem(saveUserInfoKey);
				}
			}
			data.key =  getKey();
			setLoginInfo(data);
			result = data;
		}
	},function(data){
		msg = '服务器异常,请稍后重试';
	},function(data){
		if(isNotBlank(msg)){
			loadHide();
			show_err_msg(msg);
		}else{
			if(result){
				postBehavior(result.userName,result.userId,result.userName+'登录微信名片管理后台',function(){
					loginTime = (new Date()).format('yyyy年MM月dd日 hh时mm分ss秒');
					setInfo(loginTimeKey,loginTime);
					setTimeout(function(){
						window.location.href = 'main.html';
					},800);
					//
				});
			}
		}
	})*/
}
var msgdsq;
//错误时：提示调用方法
function show_err_msg(msg) {
	$('.msg_bg').html('');
	$('.sub_err').html('');
	$('body').append('<div class="sub_err" style="position:absolute;top:456px;left:0;width:450px;z-index:999999;"></div>');
	var errhtml = '<div style="padding:8px 0px;border:0px solid #ff0000;width:100%;margin:0 auto;color:#97CBFF;text-align:center;font-size:16px;font-family:KaiTi;"><img style="margin-right:2px;" src="resources/images/error.png">';
	var errhtmlfoot = '</div>';

	$('.msg_bg').height($(document).height());
	$('.sub_err').html(errhtml + msg + errhtmlfoot);
	var left = ($(document).width() - 10) / 2;
	$('.sub_err').css({
		'left' : left + 'px'
	});
	var scroll_height = $(document).scrollTop();
	$('.sub_err').animate({
		'top' : scroll_height + 456
	}, 2200);
	msgdsq = setTimeout(function() {
		$('.sub_err').animate({
			'top' : scroll_height + 456
		}, 2200);
		setTimeout(function() {
			$('.msg_bg').remove();
			$('.sub_err').remove();
		}, 1000);
	}, "1000");
}
