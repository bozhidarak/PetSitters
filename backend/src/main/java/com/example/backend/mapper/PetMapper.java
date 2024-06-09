package com.example.backend.mapper;

import com.example.backend.dto.PetDTO;
import com.example.backend.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PetMapper {
    @Mapping(source = "petSitterOffer.offerId", target = "sitterOfferId")
    @Mapping(source = "petOwnerOffer.id", target = "ownerOfferId")
    PetDTO toDTO(Pet pet);
    @Mapping(target = "petSitterOffer", ignore = true)
    @Mapping(target = "petOwnerOffer", ignore = true)
    Pet toEntity(PetDTO petDTO);
}
