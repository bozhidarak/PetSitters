package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

UserDTO toDTO(UserEntity userEntity);
UserEntity toEntity(UserDTO userDTO);
}
