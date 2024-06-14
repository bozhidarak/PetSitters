package com.example.backend.service;

import com.amazonaws.services.dynamodbv2.xspec.M;
import com.amazonaws.services.iot.model.ResourceAlreadyExistsException;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PictureService pictureService;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, PictureService pictureService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.pictureService = pictureService;
    }

    @Transactional //?
    public UserDTO getByID(Long id){
        User user = userRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("No user with id: " + id));
        return userMapper.toDTO(user);
    }

    public UserDTO createUser(UserDTO userDTO, MultipartFile profilePic) {
        User user = userMapper.toEntity(userDTO);
        if(userRepository.existsByEmail(user.getEmail())){
            throw new ResourceAlreadyExistsException("There is already an user with this email: " + user.getEmail());
        }
        if (profilePic != null){
            String profilePicPath = pictureService.uploadPictureToBucket(profilePic);
            user.setProfilePic(profilePicPath);
        }
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserDTO login(String email, String password){
        if(!userRepository.existsByEmail(email)){
            throw new ResourceNotFoundException("User with this email not found.");
        }
        User user = userRepository.findByEmail(email);
        if(!user.getPassword().equals(password)){
            throw new ResourceNotFoundException("Wrong credentials. ");
        }
        return userMapper.toDTO(user);

    }

    public UserDTO editUser(UserDTO userDTO){
        if(!userRepository.existsById(userDTO.getId())){
            throw new ResourceNotFoundException("No user with id: " + userDTO.getId());
        }
        User user = userMapper.toEntity(userDTO);
        return userMapper.toDTO(userRepository.save(user));
    }

    public void deleteUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No user with id: " + id));
        pictureService.deleteFile(user.getProfilePic());
        userRepository.deleteById(id);
    }
}
