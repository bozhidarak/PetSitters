package com.example.backend.service;

import com.example.backend.dto.PetDTO;
import com.example.backend.entity.Pet;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.PetSitterOffer;
import com.example.backend.mapper.PetMapper;
import com.example.backend.repository.PetRepository;
import org.springframework.stereotype.Service;


@Service
public class PetService {
    private final PetRepository petRepository;
    private final PetMapper petMapper;

    public PetService(PetRepository petRepository, PetMapper petMapper) {
        this.petRepository = petRepository;
        this.petMapper = petMapper;
    }

    public Pet createPetSitter(PetDTO petDto, PetSitterOffer sitterOffer){
        Pet pet = petMapper.toEntity(petDto);
        pet.setPetSitterOffer(sitterOffer);
        return petRepository.save(pet);
    }

    public Pet createPetOwner(PetDTO petDto, PetOwnerOffer ownerOffer){
        Pet pet = petMapper.toEntity(petDto);
        pet.setPetOwnerOffer(ownerOffer);
        return petRepository.save(pet);
    }

    public void updatePetById(Long petId, Integer newNumberOfPets) {
        Pet pet = petRepository.findById(petId).orElse(null);
        if(pet != null){
            pet.setNumberOfPets(newNumberOfPets);
            petRepository.save(pet);
        }
    }

    public void deletePetsFromOffer(Long offerId, boolean isSitter){
        if(isSitter){
            petRepository.deleteByPetSitterOfferId(offerId);
        }
        else{
            petRepository.deleteByPetOwnerOfferId(offerId);
        }
    }
}
