package com.example.backend.repository;

import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.enums.PetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PetOwnerOfferRepository extends JpaRepository<PetOwnerOffer, Long> {
    Page<PetOwnerOffer> findAll(Pageable pageable);
    Page<PetOwnerOffer> findByPetsPetTypeIn(List<PetType> petTypes, Pageable pageable);
    Page<PetOwnerOffer> findByStartDateAfter(LocalDate startDate, Pageable pageable);
    Page<PetOwnerOffer> findByEndDateBefore(LocalDate endDate, Pageable pageable);
}

