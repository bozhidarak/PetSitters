package com.example.backend.service;

import com.example.backend.dto.PetDTO;
import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.entity.Pet;
import com.example.backend.entity.PetSitterOffer;
import com.example.backend.entity.User;
import com.example.backend.mapper.PetSitterOfferMapper;
import com.example.backend.repository.PetSitterOfferRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PetSitterOfferService {

    PetSitterOfferRepository offerRepository;
    PetSitterOfferMapper offerMapper;

    UserRepository userRepository;

    PetService petService;
    PictureService pictureService;

    public PetSitterOfferService(PetSitterOfferRepository offerRepository, PetSitterOfferMapper offerMapper, UserRepository userRepository, PetService petService, PictureService pictureService) {
        this.offerRepository = offerRepository;
        this.offerMapper = offerMapper;
        this.userRepository = userRepository;
        this.petService = petService;
        this.pictureService = pictureService;
    }

    public List<PetSitterOfferDTO> getAllOffers(){
        return offerRepository.findAll()
                .stream()
                .map(offerMapper::toDTO)
                .toList();
    }

    public List<PetSitterOfferDTO> getAllOffers(PageRequest pageRequest){
        return offerRepository.findAll(pageRequest)
                .stream()
                .map(offerMapper::toDTO)
                .toList();
    }

    public PetSitterOfferDTO getOfferById(Long id){
        PetSitterOffer offerEntity = offerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("No pet sitter offer with id: " + id));
        return offerMapper.toDTO(offerEntity);
    }

    public PetSitterOfferDTO createOffer(PetSitterOfferDTO offerDTO, List<MultipartFile> pictures){
        PetSitterOffer offerEntity = offerMapper.toEntity(offerDTO);
        Long userId = offerDTO.getUserId();
        User user = userRepository.findById(userId).orElse(null);
//                orElseThrow(
//                () -> new ResourceNotFoundException("No user with id: " + userId));
        //set offer in user if an offer doesn't exist WHAT IF EXISTS
        if(user.getPetSitterOffer() != null){
            throw new ResourceNotFoundException("This user already has an offer -> edit the existing offer instead");
        }
        user.setPetSitterOffer(offerEntity);
        offerEntity.setUser(user);
        //setPets
        List<PetDTO> petDTOs = offerDTO.getPets();
        for(PetDTO petDTO : petDTOs){
            Pet pet = petService.createPet(petDTO);
            offerEntity.getPets().add(pet);
        }
        if(!pictures.isEmpty()){
            for(MultipartFile picture: pictures){
                pictureService.addPictureToOffer(picture,offerEntity,null);
            }
        }
        return offerMapper.toDTO(offerRepository.save(offerEntity));
    }

    public void deleteOffer(Long id){
        if(!offerRepository.existsById(id)){
            throw new ResourceNotFoundException("No pet sitter offer with id: " + id);
        }
        offerRepository.deleteById(id);
    }
}
