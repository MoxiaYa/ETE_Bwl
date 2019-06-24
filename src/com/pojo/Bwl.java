package com.pojo;

public class Bwl {

	private int id;
	private String title;
	private String detail;
	private String owner;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	@Override
	public String toString() {
		return "Bwl [id=" + id + ", title=" + title + ", detail=" + detail + ", owner=" + owner + "]";
	}
	
	
}
