package com.serviceImpl;

import java.util.List;import javax.swing.plaf.basic.BasicLabelUI;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.DAO.mapper.BwlMapper;
import com.DAO.mapper.UserMapper;
import com.pojo.Account;
import com.pojo.Bwl;
import com.service.UserService;

@Component
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper um = null;
	
	@Autowired
	private BwlMapper bm = null;
	
	@SuppressWarnings("static-access")
	@Override
	public Account loginUser(String id, String pwd) {
		// TODO Auto-generated method stub
		Account account = um.getAccount(id,pwd);
		if(account==null) {
			System.out.println("账号或密码错误");
			return null;
		}else {
			return account;
		}
		
	}

	@Override
	public JSONObject getBwl(String id) {
		
		JSONObject result = new JSONObject();
		List<Bwl> bwls = bm.getBwls(id);
		
		for(int i=0;i<bwls.size();i++) {
			Bwl bwl = bwls.get(i);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id",bwl.getId()).put("title", bwl.getTitle()).put("detail", bwl.getDetail()).put("owner", bwl.getOwner());
			result.put(new String().valueOf(bwl.getId()), jsonObject);
		}
		
		return result;
	}

	@Override
	public boolean updateBwl(Bwl bwl) {
		
		int i = bm.updateBwl(bwl);
		if(i==1) {
			return true;
		}else {
			return false;
		}
		
	}

	@Override
	public boolean addBwl(Bwl bwl) {
		int i = bm.addBwl(bwl);
		if(i==1) {
			return true;
		}else {
			return false;
		}
		
	}

	@Override
	public void deleteBwls(List<String> bwList) {
		bm.deleteBwl(bwList);
		
	}

}
