var mylist = [] //本地备忘录列表
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