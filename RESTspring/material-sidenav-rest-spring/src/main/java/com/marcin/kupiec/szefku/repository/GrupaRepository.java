package com.marcin.kupiec.szefku.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.marcin.kupiec.szefku.model.Grupa;

@Repository("grupaRepository")
public interface GrupaRepository extends JpaRepository<Grupa, Integer> {
    Grupa findByName(String name);
}
