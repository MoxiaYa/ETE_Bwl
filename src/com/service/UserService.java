package com.service;

import java.util.List;

import org.json.JSONObject;

import com.pojo.Account;
import com.pojo.Bwl;

public interface UserService {
	public Account loginUser(String id,String pwd);
	public JSONObject getBwl(String id);
	public boolean updateBwl(Bwl bwl);
	public boolean addBwl(Bwl bwl);
	public void deleteBwls(List<String> bwList);
}
