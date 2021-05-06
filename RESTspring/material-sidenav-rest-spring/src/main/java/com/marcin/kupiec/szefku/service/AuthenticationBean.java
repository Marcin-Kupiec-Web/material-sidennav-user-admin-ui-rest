package com.marcin.kupiec.szefku.service;

import com.marcin.kupiec.szefku.model.User;

public class AuthenticationBean {

	public User userOut;
	
    private String message;
    
    public AuthenticationBean(String message, User userOut) {
    	this.userOut=userOut;
    	userOut.setPassword(null);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("HelloWorldBean [message=%s]", message);
    }

}