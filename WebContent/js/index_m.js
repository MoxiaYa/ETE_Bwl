var mylist = [] //本地备忘录列表
var islogin = false;
$(window).ready(function() {
	flash_local();
})

function test(x) {
	alert(x)
}

function flash_local() {
	var allbook = localStorage.valueOf();
	var k = 0;
	for (var i = 0; i < allbook.length; i++) {
		var j = JSON.parse(localStorage.getItem(localStorage.key(i)));
		mylist[i] = j;
		if (k == 0) {
			$("#local_list").html("<tr>" +
				"<td onclick='local_update(\""+j.id+"\")' data-transition='flip' class='list_left'>" + j.title + "</td>" +
				"<td class='list_right'><input type='checkbox' name='local_list' value='" + j.id + "' /></td>" +
				"</tr>").trigger('create');
			k++;
		} else {
			$("#local_list").append("<tr>" +
				"<td onclick='local_update(\""+j.id+"\")' data-transition='flip' class='list_left'>" + j.title + "</td>" +
				"<td class='list_right'><input type='checkbox' name='local_list' value='" + j.id + "' /></td>" +
				"</tr>").trigger('create');

		}
	}
}

function flash_online(){
	
	var k = 0;
	$.each(online_books,function(i,j){
		if (k == 0) {
			$("#online_list").html("<tr>" +
				"<td onclick='online_update(\""+j.id+"\")' data-transition='flip' class='list_left'>" + j.title + "</td>" +
				"<td class='list_right'><input type='checkbox' name='online_list' value='" + j.id + "' /></td>" +
				"</tr>").trigger('create');
			k++;
		} else {
			$("#online_list").append("<tr>" +
				"<td onclick='online_update(\""+j.id+"\")' data-transition='flip' class='list_left'>" + j.title + "</td>" +
				"<td class='list_right'><input type='checkbox' name='online_list' value='" + j.id + "' /></td>" +
				"</tr>").trigger('create');
			
		}
	})
		
	
}

//刷新，请求获取数据
function update_online(){
	$.getJSON("bwl/getBwl.do",function(data,status){
		if(status=="success"){
			if(data['no']=="no"){
				alert("未登录或登录已过期！请登录重试")
				
			}else{
				
				online_books = data;
				
				
			}
		}else{
			alert("刷新失败！服务器异常！")
		}
	})
}

var online_books = {};

function login_ok(){
	islogin = true;
	$("#to_online").attr("href","#online");
	$("#to_online").attr("onclick","flash_online()");
	update_online();

}

function online_update(id){
	
}

function online_login(){
	var user = $("#login_id").val();
	var pwd = $("#login_pwd").val();
	
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
					
					alert("登录成功！")
					online_books = data
					flash_online()
					
					islogin = true;
					$("#to_online").attr("href","#online")
					
					window.location.href = '#online'
					// 
					// $("#online_login").hide()
					// $("#online").show()
					// $("#logout_btn").show()
				}
			}else{
				alert("登录失败！服务器异常！")
			}
		})
	}
	
}

function local_update(x){
	var a = JSON.parse(localStorage.getItem(x))
	
	$("#add_title").val(a.title);
	editor2.txt.html(a.detail);
	
	$("#add_btn").attr("onclick","local_update_ok('"+x+"')")
	$("#add_cancel").attr("href","#local")
	
	window.location.href = "#add"
}

function local_update_ok(id){
	
	var title = $("#add_title").val();
	var detail = editor2.txt.html();
	
	data = {
		"id": id,
		"title": title,
		"detail": detail
	}
	
	localStorage.setItem(id, JSON.stringify(data)) //存入localStorage
	
	$("#add_title").val("");
	editor2.txt.html("");
	
	flash_local()
	window.location.href = "#local"
}

function local_add(){
	var title = $("#add_title").val();
	var detail = editor2.txt.html();
	//生成ID
	var have = localStorage.length
	var id = "b" + have;
	
	data = {
		"id": id,
		"title": title,
		"detail": detail
	}
	
	localStorage.setItem(id, JSON.stringify(data)) //存入localStorage
	
	$("#add_title").val("");
	editor2.txt.html("");
	
	flash_local()
	window.location.href = "#local"
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
			flash_local()
		}
	}
}

function delete_online(){
	
}

function to_add(x){
	switch(x){
		case 'local':
		$("#add_btn").attr("onclick","local_add()")
		$("#add_cancel").attr("href","#local")
		break;
	
		
	}
}

function add_cancel(){
	$("#add_title").val("");
	editor2.txt.html("");
}