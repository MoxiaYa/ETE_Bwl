<%@page import="javax.websocket.Session"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="com.pojo.Account" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<jsp:useBean id="Account" class="com.pojo.Account" />
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>ETE备忘录</title>

		<script src="./jar/jquery.min.js"></script>
		<script src="./jar/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>
		<script src="./jar/vue.min.js"></script>
		<script src="./jar/WangEd/wangEditor.min.js"></script>

		<script src="./js/index_m.js"></script>
		<link rel="stylesheet" type="text/css" href="./jar/jquery.mobile-1.4.5/jquery.mobile-1.4.5.css"/>
		<link rel="stylesheet" type="text/css" href="./jar/bootstrap-3.3.7/dist/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="./css/index_m.css" />
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
		
<%
Account account = (Account)session.getAttribute("User");
boolean islogin = false;
if(account!=null){
	islogin=true;
}
%>



	</head>
	<body>
		
		<div id="index" data-role="page">
			<div data-role="content" id="index_content" class="content">
				<div id="content_main">
					<label>欢迎使用ETE备忘录</label>
					<label>请先选择模式</label>
					<a href="#local" data-role="button" data-transition="flip" onclick="flash_local()">本地模式</a>
					<a href="" data-role="button">网络模式</a>
				</div>
			</div>
		</div>
		
		
		
		<div id="local" data-role="page">
			<div data-role="content" id="index_content" class="content">
				<div id="local_main">
					
					<div id="local_have">
						<table class="table">
							
							<tbody id="local_list">
								<tr>
									
								</tr>
								
							</tbody>
						</table>
					</div>
					<div data-role="navbar">
						<ul>
							<li><a href="#index" data-transition="flip">返回</a></li>
							<li><a href="#add" data-transition="flip">添加</a></li>
							<li><a onclick="delete_local()">删除</a></li>
						</ul>
						
					</div>
				</div>
			</div>
		</div>
		
		<div id="add" data-role="page">
			<div data-role="content" class="content" id="add_content">
				<div>
					<label style="color: white;">标题</label>
					<input type="text" id="add_title" />
				</div>
				<div id="add_wang" style="margin-top: 3%;height: 80%;width: 100%;position: relative;background-color: white;"></div>
				
				<script>
					
					var E = window.wangEditor
					var editor2 = new E('#add_wang')
					
					editor2.customConfig.menus = [
						'head',  // 标题
						'bold',  // 粗体
						'fontSize',  // 字号
						'underline',  // 下划线
						'strikeThrough',  // 删除线
						'foreColor',  // 文字颜色
						'backColor',  // 背景颜色
						'justify',  // 对齐方式
						'table',  // 表格
					]
					editor2.customConfig.zIndex = 100
					
					editor2.create()
					
					$("#add .w-e-text-container").css("height","90%")
					
				</script>
				
				<div data-role="navbar">
					<ul>
						<li><a onclick="local_add()">确认</a></li>
						<li><a href="#local" onclick="add_cancel()" data-transition="flip">取消</a></li>
					</ul>
					
				</div>
				
			</div>
			
			
			
		</div>
		
		
	</body>
</html>
