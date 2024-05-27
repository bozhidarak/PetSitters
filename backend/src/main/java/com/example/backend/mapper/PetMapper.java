package com.example.backend.mapper;

import com.example.backend.dto.PetDTO;
import com.example.backend.entity.Pet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PetMapper {
    PetDTO toDTO(Pet pet);
    Pet toEntity(PetDTO petDTO);
}
