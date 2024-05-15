package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO getByID(Long id){
        UserEntity userEntity = userRepository.findById(id).orElseThrow();
        return userMapper.toDTO(userEntity);
    }

    public UserDTO editUser(UserDTO userDTO){
        UserEntity userEntity = userMapper.toEntity(userDTO);
        return userMapper.toDTO(userRepository.save(userEntity));
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}


//controller > service > mapper > repository
//      model                       dto