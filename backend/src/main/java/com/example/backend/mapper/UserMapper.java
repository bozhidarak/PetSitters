package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.UserEntity;

public class UserMapper {

public static UserDTO toDTO(UserEntity userEntity){
    return new UserDTO(userEntity.getId(),
            userEntity.getUsername(),
            userEntity.getEmail(),
            userEntity.getLocation(),
            userEntity.getBirthDate(),
            userEntity.getGender(),
            userEntity.getProfilePic(),
            userEntity.getName());
    }
}
