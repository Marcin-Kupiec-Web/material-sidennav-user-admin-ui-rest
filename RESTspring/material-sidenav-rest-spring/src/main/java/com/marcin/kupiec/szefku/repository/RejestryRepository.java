package com.marcin.kupiec.szefku.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.marcin.kupiec.szefku.model.Rejestry;

@Repository("rejestryRepository")
public interface RejestryRepository extends JpaRepository<Rejestry, Long>{
	Rejestry findByAkcja(String akcja);
}

