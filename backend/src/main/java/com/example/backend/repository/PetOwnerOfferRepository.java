package com.example.backend.repository;

import com.example.backend.entity.PetOwnerOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetOwnerOfferRepository extends JpaRepository<PetOwnerOffer, Long> {
    Page<PetOwnerOffer> findAll(Pageable pageable);
}
