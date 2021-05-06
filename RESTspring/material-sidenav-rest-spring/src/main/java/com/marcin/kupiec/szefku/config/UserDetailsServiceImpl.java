package com.marcin.kupiec.szefku.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.marcin.kupiec.szefku.model.Privilege;
import com.marcin.kupiec.szefku.model.Role;
import com.marcin.kupiec.szefku.model.User;
import com.marcin.kupiec.szefku.repository.RoleRepository;
import com.marcin.kupiec.szefku.repository.UserRepository;
@Component
public class UserDetailsServiceImpl implements UserDetailsService{
	 @Autowired
	    private UserRepository usersRepository;
	  @Autowired
	    private RoleRepository roleRepository;
	  
	  private User user;
	  
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		user = usersRepository.findByUsername(username);
		
        if (user == null) {
            return new org.springframework.security.core.userdetails.User(
              " ", " ", true, true, true, true,getAuthorities(Arrays.asList(roleRepository.findByName("ROLE_USER"))));
        }

        return new org.springframework.security.core.userdetails.User(
          user.getUsername(),user.getPassword(), user.isEnabled(), true, true, 
          true, getAuthorities(user.getRoleCollection()));
          
    }
	 
	  
	  private List<String> getPrivileges(List<Role> roles) {
	        List<String> privileges = new ArrayList<>();
	        List<String> rols=new ArrayList<>();
	        List<Privilege> collection = new ArrayList<>();
	        for (Role role : roles) {
	        	rols.add(role.getName());
	            collection.addAll(role.getPrivileges());
	        }
	        for (Privilege item : collection) {
	            privileges.add(item.getName());
	        }
	        return privileges;
	    }
	  
	 private Collection<? extends GrantedAuthority> getAuthorities(
		      List<Role> roles) {
		        return getGrantedAuthorities(getPrivileges(roles));
		    }
	 
	  private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
	        List<GrantedAuthority> authorities = new ArrayList<>();
	        for (String privilege : privileges) {
	            authorities.add(new SimpleGrantedAuthority(privilege));
	        }
	        return authorities;
	    }


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
}

		