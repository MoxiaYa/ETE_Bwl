package com.DAO.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.pojo.Bwl;
@Repository
public interface BwlMapper {
	public List<Bwl> getBwls(String id);
	public int updateBwl(Bwl bwl);
	public int addBwl(Bwl bwl);
	public int deleteBwl(List<String> idList);
}
