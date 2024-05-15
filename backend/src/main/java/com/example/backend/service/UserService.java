package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserDTO getByID(Long id){
        UserEntity userEntity = userRepository.findById(id).orElseThrow();
        return UserMapper.toDTO(userEntity);
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}


//controller > service > mapper > repository
//      model                       dto