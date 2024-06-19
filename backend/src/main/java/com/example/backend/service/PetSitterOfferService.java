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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.util.*;

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
        List<PetSitterOfferDTO> offers = offerRepository.findAll()
                .stream()
                .map(offerMapper::toDTO)
                .toList();
        offers.forEach(this::setUser);
        return offers;
    }

    public List<PetSitterOfferDTO> getAllOffers(PageRequest pageRequest){
        List<PetSitterOfferDTO> offers = offerRepository.findAll(pageRequest)
                .stream()
                .map(offerMapper::toDTO)
                .toList();
        offers.forEach(this::setUser);
        return offers;
    }

    public PetSitterOfferDTO getOfferById(Long id){
        PetSitterOffer offerEntity = offerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("No pet sitter offer with id: " + id));
        PetSitterOfferDTO offer = offerMapper.toDTO(offerEntity);
        setUser(offer);
        return offer;
    }

    @Transactional //?? not sure if needed
    public PetSitterOfferDTO createOffer(PetSitterOfferDTO offerDTO, List<MultipartFile> pictures){
        PetSitterOffer offerEntity = offerMapper.toEntity(offerDTO);
        Long userId = offerDTO.getUserId();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user with id: " + userId));
        if(offerRepository.existsByUserId(userId)){
            throw new ResourceNotFoundException("This user already has an offer -> edit the existing offer instead");
        }
        offerEntity.setUser(user);
        List<PetDTO> petDTOs = offerDTO.getPets();
        List<Pet> pets = new ArrayList<>();
        PetSitterOffer offer = offerRepository.save(offerEntity);
        for(PetDTO petDTO : petDTOs){
            Pet pet = petService.createPetSitter(petDTO, offer);
            pets.add(pet);
        }
        offer.setPets(pets);
        if(!pictures.isEmpty()) {
            for (MultipartFile picture : pictures) {
                pictureService.addPictureToOffer(picture, offer, null);
            }
        }
        PetSitterOfferDTO offerDTOtoSave = offerMapper.toDTO(offer);
        setUser(offerDTOtoSave);
        return offerDTOtoSave;
    }

    public PetSitterOfferDTO updateOffer(Long id, PetSitterOfferDTO offerDTO){
        PetSitterOffer savedOffer = offerRepository.findById(id).orElse(null);
        if(savedOffer == null) {
            throw new ResourceNotFoundException("Offer not found");
        }
        if (!offerDTO.getUserId().equals(savedOffer.getUser().getId())) {
            throw new InvalidParameterException("The user id doesn't belong to this offer");
        }

        PetSitterOffer toSave = offerMapper.toEntity(offerDTO);
        toSave.setOfferId(id);

        toSave.setPictures(savedOffer.getPictures()); // not updating the pictures

        offerRepository.save(toSave);

       updatePets(toSave, offerDTO.getPets());
        PetSitterOfferDTO offerDTOtoSave = offerMapper.toDTO(toSave);
        setUser(offerDTOtoSave);
       return offerDTOtoSave;
    }

    public void deleteOffer(Long id){
        if(!offerRepository.existsById(id)){
            throw new ResourceNotFoundException("No pet sitter offer with id: " + id);
        }
        offerRepository.deleteById(id);
    }

    public void updatePets(PetSitterOffer toSave, List<PetDTO> petDTOs){
        petService.deletePetsFromOffer(toSave.getOfferId(), true);
        List<Pet> petsToSave = new ArrayList<>();
        for(PetDTO petDTO: petDTOs){
            Pet pet = petService.createPetSitter(petDTO, toSave);
            petsToSave.add(pet);
        }
        toSave.setPets(petsToSave);
    }

    public void setUser(PetSitterOfferDTO offer){
        User user = userRepository.findById(offer.getUserId()).orElseThrow(
                () -> new ResourceNotFoundException("User not found")
        );
        offer.setUserName(user.getName());
        offer.setUserEmail(user.getEmail());
        offer.setUserLocation(user.getLocation());
        offer.setUserProfilePic(user.getProfilePic());
    }

    public void deleteByUserId(Long userId){
        offerRepository.deleteByUserId(userId);
    }
}
