package com.example.backend.repository;

import com.example.backend.entity.Pet;
import com.example.backend.entity.PetSitterOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface PetSitterOfferRepository extends JpaRepository<PetSitterOffer, Long>, JpaSpecificationExecutor<PetSitterOffer> {
Boolean existsByUserId(Long id);
void deleteByUserId(Long userId);
Optional<PetSitterOffer> getByUserId(Long id);
}
