<%@page import="javax.websocket.Session"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="com.pojo.Account" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<jsp:useBean id="Account" class="com.pojo.Account"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		 
		<title>ETE备忘录</title>
		
		<script src="./jar/jquery.min.js"></script>
		<script src="./jar/vue.min.js"></script>
		<script src="./jar/WangEd/wangEditor.min.js"></script>
		 
		<script src="./js/index.js"></script>
		
		<link rel="stylesheet" type="text/css" href="./jar/bootstrap-3.3.7/dist/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="./css/index.css" />

<%
Account account = (Account)session.getAttribute("User");
boolean islogin = false;
if(account!=null){
	islogin=true;
}
%>

	</head>
	<body>
		<div id="main">
			<div id="main_bg"></div>
			<div id="main_btns">
				<h1 style="margin-top: 10%;">欢迎使用ETE备忘录，请先选择模式：</h1>
				<div>
					<button class="btn btn-primary" onclick="local_btn()">本地模式</button>
					<c:if test="<%=!islogin %>">
						<button class="btn btn-primary" onclick="online_btn()">网络模式</button>
					</c:if>
					<c:if test="<%=islogin %>">
						<button class="btn btn-primary" onclick="to_online()">网络模式</button>
					</c:if>
				</div>
			</div>
			<div id="local" style="display: none;">
				<div id="local_return" style="text-align: left;height: 8%;">
					
						<button style="max-height: 60px;max-width: 50px;" class="btn btn-default" onclick="to_main('local')">返回</button>
					<div style="position: absolute;top: 10px;right: 8%;">
						<label>全选</label>
						<input type="checkbox" id="all_local" />
					</div>
				</div>
				<div id="local_have">
					<ul>
						<todo-item v-for="item in bookList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
					</ul>
				</div>

				<div id="local_btns">
					<button class="btn btn-default" onclick="local_add_btn('add')">添加</button>
					<button class="btn btn-default" onclick="delete_local()">删除</button>
				</div>

			</div>

			<div id="online" style="display: none;">
				<div id="online_return" style="text-align: left;height: 8%;">
					<button style="max-height: 60px;max-width: 50px;" class="btn btn-default" onclick="to_main('online')">返回</button>
					<button style="max-height: 60px;max-width: 50px;" class="btn btn-default" onclick="update_online()">刷新</button>
					<c:if test="<%=islogin %>">
						<button style="max-height: 60px;max-width: 120px;" class="btn btn-default" onclick="online_logout()">退出登录</button>
					</c:if>
					<button id="logout_btn" style="max-height: 60px;max-width: 120px;display: none;" class="btn btn-default" onclick="online_logout()">退出登录</button>
					<div style="position: absolute;top: 10px;right: 8%;">
						<label>全选</label>
						<input type="checkbox" id="all_online" />
					</div>

				</div>
				<div id="online_have">
					<ul>
						<online v-for="item in bookList" v-bind:todo="item" v-bind:key="item.id"></online>
					</ul>
				</div>

				<div id="online_btns">
					<button class="btn btn-default" onclick="online_add_btn('add')">添加</button>
					<button class="btn btn-default" onclick="delete_online()">删除</button>
				</div>

			</div>

			<div id="online_login" style="display: none;">
				<div style="margin-top: 20%;" onkeydown="keytologin()">
					<div style="margin-top: 5%;">
						<label>账号</label>
						<input type="text" id="user" autofocus="autofocus" />
					</div>
					<div style="margin-top: 5%;">
						<label>密码</label>
						<input type="password" id="pwd" />
					</div>

					<div style="margin-top: 5%;">
						<button style="margin-right: 10px;" class="btn btn-default" onclick="online_login()">登录</button>
						<button style="margin-left: 10px;" class="btn btn-default" onclick="to_main('online_login')">返回</button>
						<div style="margin-top: 10px;">
							<button class="btn btn-default">没有账号？注册一个</button>
						</div>
					</div>

				</div>
			</div>
		
		<script src="./js/local_add_vue.js"></script>

		<div id="add" style="display: none;">
			<div style="margin-top: 2%;position: relative;height: 98%;">
				<label>标题：</label>
				<input id="add_title" type="text" style="width: 80%;background-color: rgba(212, 226, 248, 0.5);" />
				<div id="add_wang" style="margin-top: 3%;height: 70%;width: 86%;margin-left: 7%;position: relative;">

				</div>
				<!--富文本区域-->

				<div style="position: absolute;bottom: 0;left: 0;width: 100%;height: 15%;">
					<button id="add_ok" class="btn btn-default" style="margin: 10px;">确认</button>
					<button id="add_cancel" class="btn btn-default" style="margin: 10px;">取消</button>
				</div>
			</div>
		</div>
		</div>

		<script src="./js/index_wang.js"></script>



	</body>
</html>
