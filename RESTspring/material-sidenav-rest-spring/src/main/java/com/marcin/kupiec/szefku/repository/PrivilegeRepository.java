package com.marcin.kupiec.szefku.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.szefku.model.Privilege;

@Repository("privilegeRepository")
public interface PrivilegeRepository extends JpaRepository<Privilege, Integer> {
    Privilege findByName(String name);

}
