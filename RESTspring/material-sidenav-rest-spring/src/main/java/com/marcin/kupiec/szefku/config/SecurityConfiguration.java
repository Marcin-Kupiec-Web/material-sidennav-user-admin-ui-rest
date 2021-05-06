package com.marcin.kupiec.szefku.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserDetailsServiceImpl userDetailsServices;
	
//	@Autowired
//	CustomAuthenticationProvider customAuthenticationProvider;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		//.antMatchers("/home","/**/*.js", "/**/*.css").access("hasRole('admin') or hasRole('sluchacz')")
		//.antMatchers("/users/list").hasAnyAuthority("ONLY_ADMIN_PRIVILEGE")
        //.antMatchers("/app/restControllerAppUs/getUsers").hasAnyAuthority("ONLY_ADMIN_PRIVILEGE")
       // .antMatchers("/app/restControllerAppUs/updateUsers").hasAnyAuthority("ONLY_ADMIN_PRIVILEGE")
		//.antMatchers("/home","/**/*.js", "/**/*.css").permitAll()
	 http.httpBasic().and().csrf().
	        disable()
        .authorizeRequests()
        .antMatchers("/role/list").hasAnyAuthority("ONLY_ADMIN_PRIVILEGE")
        .antMatchers("/uprawnienia/list").hasAnyAuthority("ONLY_ADMIN_PRIVILEGE")
        .antMatchers(HttpMethod.OPTIONS)
        .permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin()
        .loginPage("/login")
        .permitAll()
        .defaultSuccessUrl("/")
        .and()
         .logout()
        .permitAll();
     }
	

	  @Bean
	  public BCryptPasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    };

	  @Override
	  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	
    	auth.userDetailsService(userDetailsServices).passwordEncoder(passwordEncoder());
    //	auth.authenticationProvider(customAuthenticationProvider);
    	
    }
}