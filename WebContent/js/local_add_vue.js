// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
	// todo-item 组件现在接受一个
	// "prop"，类似于一个自定义特性。
	// 这个 prop 名为 todo。
	props: ['todo'],
	template: '<li><table><tr><td style="width: 95%;" @click="update(todo)">{{todo.title}}</td><td><input name="local_list" v-bind:value="todo.id" type="checkbox" /></td></tr></table></li>',
	methods: {
		update(x) {
			local_update_btn(x)
		},
		
	}
})

var mylist = get_my_book()

var app7 = new Vue({
	el: '#local_have',
	data: {
		bookList: mylist
	}
})

// 定义名为 todo-item 的新组件
Vue.component('online', {
	// todo-item 组件现在接受一个
	// "prop"，类似于一个自定义特性。
	// 这个 prop 名为 todo。
	props: ['todo'],
	template: '<li><table><tr><td style="width: 95%;" @click="update(todo)">{{todo.title}}</td><td><input name="online_list" v-bind:value="todo.id" type="checkbox" /></td></tr></table></li>',
	methods: {
		update(x) {
			online_update_btn(x)
		},
	}
})

var app8 = new Vue({
	el: '#online_have',
	data: {
		bookList: [{"id":"111","title":"123"}]
	}
})