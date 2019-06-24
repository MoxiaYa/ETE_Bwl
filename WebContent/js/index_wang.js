var E = window.wangEditor
		var editor2 = new E('#add_wang')
		// 或者 var editor = new E( document.getElementById('editor') )
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
			'undo',  // 撤销
			'redo'  // 重复
		]
		editor2.customConfig.zIndex = 100
		
		editor2.create()
		
		$("#local_add .w-e-text-container").css("height","90%")