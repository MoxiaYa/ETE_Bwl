var height = $(window).height()
var width = $(window).width()
var bili = width / height
var islogin = false;
var online_books = []

$(window).ready(function() {
	
	var a = isMobile();
	if(a==true){
		window.location.href = "./index_m.jsp"
	}
	
	$("#all_local").click(function(){
		if(this.checked){
			$("input[name='local_list']").prop("checked", true);
		}else{
			$("input[name='local_list']").prop("checked", false);
		}
	})
	
	$("#all_online").click(function(){
		if(this.checked){
			$("input[name='online_list']").prop("checked", true);
		}else{
			$("input[name='online_list']").prop("checked", false);
		}
	})
	
	
	
})

function isMobile() {
	var userAgentInfo = navigator.userAgent;

	var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];

	var mobile_flag = false;

	//根据userAgent判断是否是手机
	for (var v = 0; v < mobileAgents.length; v++) {
		if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
			mobile_flag = true;
			break;
		}
	}
	 var screen_width = window.screen.width;
	 var screen_height = window.screen.height;   

	 //根据屏幕分辨率判断是否是手机
	 if(screen_width < 500 && screen_height < 800){
		 mobile_flag = true;
	 }

	 return mobile_flag;
}

function online_reg_btn(){
	$("#online_login").hide()
	$("#online_reg").show()
}

function to_login(){
	$("#online_reg").hide()
	$("#online_login").show()
}

function online_reg_ok(){
	var id = $("#reg_user").val()
	var pwd = $("#reg_pwd").val()
	var repwd = $("#reg_repwd").val()
	var errorinfo = "";
	if(id==null||id==""){
		errorinfo += "请输入账号！\n"
	}
	if(pwd==null||pwd==""){
		errorinfo += "请输入密码！\n"
	}
	if(repwd==null||repwd==""){
		errorinfo += "请确认密码！\n"
	}else if(repwd!=pwd){
		errorinfo += "两次密码输入不一致！\n"
	}
	
	if(errorinfo!=""){
		alert(errorinfo)
	}else{
		$.post("bwl/addAccount.do",{"id":id,"pwd":pwd},function(data,status){
			if(status=="success"){
				if(data=="true"){
					alert("注册成功！")
					to_login();
				}else{
					alert("注册失败！账号已存在！")
				}
			}else{
				alert("注册失败！服务器异常")
			}
		})
	}
	
}

function online_logout(){
	var a = confirm("您确认要退出吗");
	if(a){
		$.get("bwl/logout.do",function(data,status){
			window.location.reload();//刷新页面
		})
	}
}

function delete_local(){
	
	var b = []
	$("input[name='local_list']:checked").each(function(i){
		b.push($(this).val())
	})
	if(b==[]||b==null||b==""){
		alert("请先选择！")
	}else{
		var a = confirm("确认要删除吗？")
		if(a){
			for(var i=0;i<b.length;i++){
				localStorage.removeItem(b[i])
			}
			
			app7.bookList = get_my_book()
			app7.$forceUpdate()
		}
	}
	
}

function delete_online(){
	var b = []
	$("input[name='online_list']:checked").each(function(i){
		b.push($(this).val())
	})
	if(b==[]||b==null||b==""){
		alert("请先选择！")
	}else{
		var a = confirm("确认要删除吗？")
		if(a){
			
			$.post("bwl/deleteBwl.do",{"ids":b.toString()},function(data,status){
				console.log(data)
				if(status=="success"){
					if(data=="true"){
						//删除成功
						update_online()
					}else{
						alert("删除失败！登录已过期，请重新登录！")
					}
				}else{
					alert("删除失败！服务器异常")
				}
			})
		}
	}
}

function to_online(){
	update_online()
	$("#main_btns").hide();
	$("#online").show()
}

function online_login(){
	var user = $("#user").val();
	var pwd = $("#pwd").val();
	
	var errorinfo = "";
	if(user==null||user==""){
		errorinfo += "请输入账号！\n"
	}
	
	if(pwd==null||pwd==""){
		errorinfo += "请输入密码！\n"
	}
	
	if(errorinfo!=""){
		alert(errorinfo)
	}else{
		$.getJSON("bwl/login.do",{"id":user,"pwd":pwd},function(data,status){
			if(status=="success"){
				if(data['no']=="no"){
					alert("登录失败！账号或密码错误！")
					
				}else{
					islogin = true;
					alert("登录成功！")
					online_books = [];//清空列表后再更新列表
					var j = 0
					$.each(data,function(i,e){
						online_books[j]=e
						j++
					})
					online_flash()//刷新
					
					$("#online_login").hide()
					$("#online").show()
					$("#logout_btn").show()
				}
			}else{
				alert("登录失败！服务器异常！")
			}
		})
	}
	
}

//刷新，请求获取数据
function update_online(){
	$.getJSON("bwl/getBwl.do",function(data,status){
		if(status=="success"){
			if(data['no']=="no"){
				alert("未登录或登录已过期！请登录重试")
				
			}else{
				
				online_books = [];//清空列表后再更新列表
				var j = 0;
				$.each(data,function(i,e){
					online_books[j]=e
					j++;
				})
				online_flash()//刷新
				
			}
		}else{
			alert("刷新失败！服务器异常！")
		}
	})
}

//刷新网络模式备忘录列表
function online_flash(){
	app8.bookList = online_books;
	app8.$forceUpdate()
}

//回车登录
function keytologin(){
	if (event.keyCode==13){
		//调用登陆按钮或者登陆方法
		online_login();
    }
}

//清除所有备忘录,测试用,慎用!
function delete_all_book() {
	localStorage.clear()
}

//从本地存储中获取所有备忘录
function get_my_book() {
	var mylist = []
	var allbook = localStorage.valueOf();
	for (var i = 0; i < allbook.length; i++) {
		mylist[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))))
	}
	return mylist
}

function local_btn() {
	$("#main_btns").hide();
	$("#local").show();
}

function online_btn() {
	if(islogin){
		to_online()
	}else{
		$("#main_btns").hide();
		$("#online_login").show();
	}
	
}

function to_main(x) {
	$("#" + x).hide();
	$("#main_btns").show();
}

function online_add_btn(x){
	switch (x) {
		case 'add':
			$("#online").hide();
			$("#add").show();
			$("#add_ok").attr("onclick", "online_add_ok()")
			$("#add_cancel").attr("onclick", "online_add_btn('cancel')")
			break;
		case 'cancel':
			$("#add_title").val("")
			editor2.txt.html("")
			$("#online").show();
			$("#add").hide();
			break;
	
	}
}



function local_add_btn(x) {

	switch (x) {
		case 'add':
			$("#local").hide();
			$("#add").show();
			$("#add_ok").attr("onclick", "local_add_ok()")
			$("#add_cancel").attr("onclick", "local_add_btn('cancel')")
			break;
		case 'cancel':
			$("#add_title").val("")
			editor2.txt.html("")
			$("#local").show();
			$("#add").hide();
			break;

	}
}

function local_update_btn(x) {
	editor2.txt.html(x.detail)
	$("#add_title").val(x.title)

	//绑定确认后修改事件
	$("#add_ok").attr("onclick", "local_update_ok(\'" + x.id + "\')")
	//绑定取消事件
	$("#add_cancel").attr("onclick", "local_add_btn('cancel')")

	$("#local").hide();
	$("#add").show();
}

function online_update_btn(x){
	editor2.txt.html(x.detail)
	$("#add_title").val(x.title)
	//绑定确认后修改事件
	$("#add_ok").attr("onclick", "online_update_ok(\'"+x.id+"\')")
	//绑定取消事件
	$("#add_cancel").attr("onclick", "online_add_btn('cancel')")
	
	$("#online").hide();
	$("#add").show();
}

function local_update_ok(id) {
	var title = $("#add_title").val();
	var detail = editor2.txt.html() 
	var data = {
		"id": id,
		"title": title,
		"detail": detail
	}
	localStorage.setItem(id, JSON.stringify(data))
	//刷新
	app7.bookList = get_my_book()
	app7.$forceUpdate()

	local_add_btn('cancel')
}

function online_update_ok(id){
	var title = $("#add_title").val();
	var detail = editor2.txt.html();
	
	$.post("bwl/updateBwl.do",{"id":id,"title":title,"detail":detail},function(data,status){
		if(status=="success"){
			if(data=="true"){
				alert("修改成功");
				online_add_btn('cancel');
				update_online();
			}else if(data=="nologin"){
				alert("修改失败！您的登录已过期，请重新登录！")
			}else{
				alert("修改失败！未知错误")
			}
		}else{
			alert("修改失败！服务器异常")
		}
	})
	
}

function local_add_ok() {
	var title = $("#add_title").val();
	var detail = editor2.txt.html() //取值

	//生成ID
	var have = localStorage.length
	var id = "b" + have;
	data = {
		"id": id,
		"title": title,
		"detail": detail
	}

	localStorage.setItem(id, JSON.stringify(data)) //存入localStorage

	//刷新
	var oldlist = app7.bookList
	oldlist[oldlist.length] = data
	app7.$forceUpdate()

	local_add_btn('cancel')

}

function online_add_ok(){
	var title = $("#add_title").val();
	var detail = editor2.txt.html() //取值
	var datas = {
		 "title":title,
		 "detail":detail
	 }
	 console.log(datas)
	$.post("bwl/addBwl.do",datas,function(data,status){
		if(status=="success"){
			if(data=="true"){
				alert("添加成功")
				update_online()
				online_add_btn('cancel')
			}else if(data=="nologin"){
				alert("添加失败！您的登录已过期，请重新登录！")
			}else{
				alert("添加失败！未知错误")
			}
		}else{
			alert("添加失败！服务器异常")
		}
	})
}
