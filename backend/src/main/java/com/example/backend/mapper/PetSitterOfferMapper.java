package com.example.backend.mapper;

import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.entity.PetSitterOffer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PetSitterOfferMapper {

    @Mapping(target = "user", ignore = true)
    PetSitterOffer toEntity(PetSitterOfferDTO offerDTO);

    @Mapping(source = "user.id", target = "userId")
    PetSitterOfferDTO toDTO(PetSitterOffer offerEntity);

}
