package com.example.backend.repository;

import com.example.backend.entity.Pet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Pet p WHERE p.petSitterOffer.id = :sitterOfferId")
    void deleteByPetSitterOfferId(@Param("sitterOfferId") Long sitterOfferId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Pet p WHERE p.petOwnerOffer.id = :ownerOfferId")
    void deleteByPetOwnerOfferId(@Param("ownerOfferId") Long ownerOfferId);

}
