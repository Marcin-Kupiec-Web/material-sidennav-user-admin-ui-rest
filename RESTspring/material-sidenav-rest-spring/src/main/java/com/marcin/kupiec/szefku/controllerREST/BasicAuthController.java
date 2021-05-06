package com.marcin.kupiec.szefku.controllerREST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcin.kupiec.szefku.config.UserDetailsServiceImpl;
import com.marcin.kupiec.szefku.model.User;
import com.marcin.kupiec.szefku.service.AuthenticationBean;

@RestController
@RequestMapping("/terminarz/restControllerApp")
public class BasicAuthController {
	@Autowired
	UserDetailsService userDetailsService;
	
    @GetMapping(path = "/basicauth")
    public AuthenticationBean basicauth() {
    	
    	UserDetailsServiceImpl udsimpl=(UserDetailsServiceImpl) userDetailsService;
   
    	User userOut=udsimpl.getUser();
        return new AuthenticationBean("Jestes zautoryzowany", userOut);
    }
}