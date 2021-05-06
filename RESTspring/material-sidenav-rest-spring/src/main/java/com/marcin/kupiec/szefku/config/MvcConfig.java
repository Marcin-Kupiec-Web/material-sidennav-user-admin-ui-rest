package com.marcin.kupiec.szefku.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class MvcConfig implements WebMvcConfigurer {
@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // registry.addViewController("/login").setViewName("login");
    }
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/terminarz/**")
       // .allowedOrigins("*")
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .exposedHeaders("Authorization")
        .allowCredentials(false).maxAge(3600);
}
  

}
