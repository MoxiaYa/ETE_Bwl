package com.DAO.mapper;


import org.springframework.stereotype.Repository;

import com.pojo.Account;
@Repository
public interface UserMapper {
	public Account getAccount(String id,String pwd);
	public int addAccount(Account account);
}
