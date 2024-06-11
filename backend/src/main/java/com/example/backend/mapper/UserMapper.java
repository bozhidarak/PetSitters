package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {PetSitterOfferMapper.class, PetOwnerOfferMapper.class, ReviewMapper.class})
public interface UserMapper {

UserDTO toDTO(User user);

User toEntity(UserDTO userDTO);
}
