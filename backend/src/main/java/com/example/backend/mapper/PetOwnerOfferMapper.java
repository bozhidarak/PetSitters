package com.example.backend.mapper;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.entity.PetOwnerOffer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PetOwnerOfferMapper {
    @Mapping(source = "user.id", target="userId")
    PetOwnerOfferDTO mapToDto(PetOwnerOffer petOwnerOffer);
    PetOwnerOffer mapToEntity(PetOwnerOfferDTO petOwnerOfferDTO);
}
