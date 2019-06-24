package com.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pojo.Account;
import com.pojo.Bwl;
import com.service.UserService;

@Controller("bwl")
@RequestMapping("/bwl")
public class BwlCon {

	@Autowired 
	private UserService us = null;
	
	@RequestMapping(value = "/login",method = RequestMethod.GET)
	@ResponseBody
	public String login(@RequestParam("id") String id,@RequestParam("pwd") String pwd,HttpSession httpSession) {
		Account account = us.loginUser(id,pwd);
		if(account!=null) {
			httpSession.setAttribute("User", account);
			JSONObject json = us.getBwl(id);
			return json.toString();
		}else {
			return new JSONObject().put("no", "no").toString();
		}
	}
	
	@RequestMapping(value = "/getBwl",method = RequestMethod.GET)
	@ResponseBody
	public String getBwl(HttpSession httpSession) {
		Account account = (Account) httpSession.getAttribute("User");
		if(account!=null) {
			return us.getBwl(account.getId()).toString();
		}else {
			return "{'no':'no'}";
		}
		
	}
	
	@RequestMapping(value = "/addBwl",method = RequestMethod.POST)
	@ResponseBody
	public String addBwl(HttpSession httpSession,@RequestParam("title") String title,@RequestParam("detail") String detail) {
		
		Account account = (Account)httpSession.getAttribute("User");
		
		if(account==null) {
			return "nologin";
		}else {
			Bwl bwl = new Bwl();
			bwl.setTitle(title);
			bwl.setDetail(detail);
			bwl.setOwner(account.getId());
			boolean a = us.addBwl(bwl);
			if(a) {
				return "true";
			}else {
				return "false";
			}
		}
		
		
	}
	
	@RequestMapping(value = "/updateBwl" , method = RequestMethod.POST)
	@ResponseBody
	public String updateBwl(HttpSession session,@RequestParam("id")int id,@RequestParam("title")String title,@RequestParam("detail")String detail) {
		
		Account account = (Account)session.getAttribute("User");
		if(account==null) {
			return "nologin";
		}else {
			Bwl bwl = new Bwl();
			bwl.setId(id);
			bwl.setTitle(title);
			bwl.setDetail(detail);
			bwl.setOwner(account.getId());
			boolean a = us.updateBwl(bwl);
			if(a) {
				return "true";
			}else {
				return "false";
			}
		}
	}
	
	@RequestMapping(value = "/logout",method = RequestMethod.GET)
	@ResponseBody
	public void logout(HttpSession session) {
		session.removeAttribute("User");
	}
	
	@RequestMapping(value = "/deleteBwl" , method = RequestMethod.POST)
	@ResponseBody
	public String deleteBwl(HttpSession session,@RequestParam("ids")String ids) {
		
		if(session.getAttribute("User")!=null) {
			System.out.println(ids);
			List<String> idlist =Arrays.asList(ids);
			System.out.println(idlist);
			us.deleteBwls(idlist);
			return "true";
			
		}else {
			return "nologin";
		}
		
	}
	
	@RequestMapping(value = "/addAccount" , method = RequestMethod.POST)
	@ResponseBody
	public String addAccount(@RequestParam("id")String id,@RequestParam("pwd")String pwd) {
		Account account = new Account();
		account.setId(id);
		account.setPwd(pwd);
		
		boolean a = us.addAccount(account);
		if(a) {
			return "true";
		}else {
			return "false";
		}
	}
	
}
