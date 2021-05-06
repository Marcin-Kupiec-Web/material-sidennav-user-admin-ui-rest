package com.marcin.kupiec.szefku.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.szefku.model.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
   
}
