var mylist = [] //本地备忘录列表
var online_books = {};//网络备忘录列表

var islogin = false;//是否登录

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
	$.ajaxSetup({async:false});
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
	$.ajaxSetup({async:true});
}



function login_ok(){
	islogin = true;
	$("#to_online").attr("href","#online");
	$("#to_online").attr("onclick","flash_online()");
	update_online();

}

function online_update(id){
	var a = online_books[id]
	
	$("#add_title").val(a.title);
	editor2.txt.html(a.detail);
	
	$("#add_btn").attr("onclick","online_update_ok('"+id+"')")
	$("#add_cancel").attr("href","#online")
	
	window.location.href = "#add"
}

function online_update_ok(id){
	//alert(id)
	var title = $("#add_title").val();
	var detail = editor2.txt.html();
	
	datas = {
		"id": id,
		"title": title,
		"detail": detail
	}
	
	$.post("bwl/updateBwl.do",datas,function(data,status){
		if(status=="success"){
			if(data=="true"){
				alert("修改成功");
				// online_add_btn('cancel');
				// update_online();
				$("#add_cancel").click();
				update_online()
				flash_online()
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

function update_and_flash(){
	update_online()
	flash_online()
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
						flash_online()
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

function local_to_add(){
	$("#add_btn").attr("onclick","local_add()")
	$("#add_cancel").attr("href","#local")
}

function online_to_add(){
	$("#add_btn").attr("onclick","online_add()")
	$("#add_cancel").attr("href","#online")
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

function online_add(){
	var title = $("#add_title").val();
	var detail = editor2.txt.html();
	var datas = {
		 "title":title,
		 "detail":detail
	 }
	 $.post("bwl/addBwl.do",datas,function(data,status){
	 	if(status=="success"){
	 		if(data=="true"){
	 			alert("添加成功")
				update_online()
				//flash_online()
	 			$("#add_cancel").click();
	 			flash_online()
				
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



function add_cancel(){
	$("#add_title").val("");
	editor2.txt.html("");
}