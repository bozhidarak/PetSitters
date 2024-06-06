package com.example.backend.repository;

import com.example.backend.entity.PetSitterOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetSitterOfferRepository extends JpaRepository<PetSitterOffer, Long> {
public Boolean existsByUserId(Long id);
}
