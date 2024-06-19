package com.example.backend.repository;

import com.example.backend.entity.Pet;
import com.example.backend.entity.PetSitterOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetSitterOfferRepository extends JpaRepository<PetSitterOffer, Long> {
Boolean existsByUserId(Long id);
void deleteByUserId(Long userId);
Optional<PetSitterOffer> getByUserId(Long id);
}
