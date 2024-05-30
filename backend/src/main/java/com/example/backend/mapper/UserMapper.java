package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PetSitterOfferMapper.class, PetOwnerOfferMapper.class, ReviewMapper.class})
public interface UserMapper {

    @Mapping(source = "petSitterOffer", target = "petSitterOffer")
    @Mapping(source = "petOwnerOffers", target = "petOwnerOffers")
    @Mapping(source = "reviewsForUser", target = "reviewsForUser")
UserDTO toDTO(User user);

    @Mapping(target = "reviewsForUser", ignore = true)
    @Mapping(target = "petSitterOffer", ignore = true)
    @Mapping(target = "petOwnerOffers", ignore = true)
User toEntity(UserDTO userDTO);
}
