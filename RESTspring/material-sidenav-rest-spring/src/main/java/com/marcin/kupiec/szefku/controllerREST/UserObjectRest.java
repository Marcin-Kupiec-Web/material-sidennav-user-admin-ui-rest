package com.marcin.kupiec.szefku.controllerREST;

import java.util.List;

import com.marcin.kupiec.szefku.model.Privilege;
import com.marcin.kupiec.szefku.model.Role;
import com.marcin.kupiec.szefku.model.User;


public class UserObjectRest {
	
	private List<User> usersList;
	private List<Role> rlm;
	private List<Privilege> plm;
	
	public void setUsersList(List<User> usersList) {
		this.usersList = usersList;
	}

	public List<User> getUsersList() {
		// TODO Auto-generated method stub
	return usersList;
	}
	public List<Role> getRlm() {
		return rlm;
	}
	public void setRlm(List<Role> rlm) {
		this.rlm = rlm;
	}

	public List<Privilege> getPlm() {
		return plm;
	}

	public void setPlm(List<Privilege> plm) {
		this.plm = plm;
	}
}
