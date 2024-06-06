package com.example.backend.service;

import com.example.backend.dto.PetDTO;
import com.example.backend.entity.Pet;
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

    public Pet createPet(PetDTO petDto){
        Pet pet = petMapper.toEntity(petDto);
        return petRepository.save(pet);
    }

}
