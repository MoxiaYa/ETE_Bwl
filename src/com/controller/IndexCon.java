package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.service.UserService;


@Controller("index")
@RequestMapping("/my")
public class IndexCon {

	
	
	@RequestMapping("/index")
	public String index() {
		// 模型和视图
		System.out.println("index");
		return "redirect:../index.jsp";
	}
	
	
}
