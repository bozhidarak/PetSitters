package com.example.backend.mapper;

import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.entity.PetSitterOfferEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PetSitterOfferMapper {

    @Mapping(target = "user", ignore = true)
    PetSitterOfferEntity toEntity(PetSitterOfferDTO offerDTO);

    @Mapping(source = "user.id", target = "userId")
    PetSitterOfferDTO toDTO(PetSitterOfferEntity offerEntity);

}
