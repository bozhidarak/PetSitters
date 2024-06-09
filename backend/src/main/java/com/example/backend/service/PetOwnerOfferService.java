package com.example.backend.service;

import com.example.backend.dto.PetDTO;
import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.entity.Pet;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.Picture;
import com.example.backend.entity.User;
import com.example.backend.enums.PetType;
import com.example.backend.mapper.PetOwnerOfferMapper;
import com.example.backend.repository.PetOwnerOfferRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetOwnerOfferService {
    private final PetOwnerOfferRepository petOwnerOfferRepository;
    private final UserRepository userRepository;
    private final PictureService pictureService;
    private final PetOwnerOfferMapper petOwnerOfferMapper;
    private final PetService petService;

    @Autowired
    public PetOwnerOfferService(PetOwnerOfferRepository petOwnerOfferRepository,
                                PictureService pictureService,
                                UserRepository userRepository,
                                PetOwnerOfferMapper petOwnerOfferMapper,
                                PetService petService)
    {
        this.petOwnerOfferRepository = petOwnerOfferRepository;
        this.userRepository = userRepository;
        this.pictureService = pictureService;
        this.petOwnerOfferMapper = petOwnerOfferMapper;
        this.petService = petService;
    }

    public List<PetOwnerOfferDTO> getAllOffers() {
        return petOwnerOfferRepository.findAll()
                .stream()
                .map(petOwnerOfferMapper::mapToDto)
                .toList();
    }
    public List<PetOwnerOfferDTO> getAllOffers(PageRequest pageRequest) {
        return petOwnerOfferRepository.findAll(pageRequest)
                .stream()
                .map(petOwnerOfferMapper::mapToDto)
                .toList();
    }
    public PetOwnerOfferDTO getOfferById(Long id) {
        PetOwnerOffer offer = petOwnerOfferRepository.findById(id).orElse(null);
        if(offer == null) {
            throw new ResourceNotFoundException("No petOwnerOffer with id: " + id);
        }
        return petOwnerOfferMapper.mapToDto(offer);
    }

    public List<PetOwnerOfferDTO> getOffersByPetType(List<PetType> petTypes) {
        return petOwnerOfferRepository.findByPetsPetTypeIn(petTypes)
                .stream()
                .map(petOwnerOfferMapper::mapToDto)
                .toList();
    }

    public PetOwnerOfferDTO createOffer(PetOwnerOfferDTO newOfferDto, List<MultipartFile> pictures) {
        PetOwnerOffer newOffer = petOwnerOfferMapper.mapToEntity(newOfferDto);
        linkOfferToUser(newOffer, newOfferDto);
        PetOwnerOffer savedOffer = petOwnerOfferRepository.save(newOffer);
        addPetsToOffer(savedOffer, newOfferDto);

        if(!pictures.isEmpty()) {
            for (MultipartFile picture : pictures) {
                pictureService.addPictureToOffer(picture, null, savedOffer);
            }
        }
        return petOwnerOfferMapper.mapToDto(savedOffer);
    }

    public PetOwnerOfferDTO updateOffer(Long offerId, PetOwnerOfferDTO offerDto) {
        PetOwnerOffer currentOffer = petOwnerOfferRepository.findById(offerId).orElse(null);
        if(currentOffer == null){
            throw new ResourceNotFoundException("Offer not found");
        }
        if (offerDto.getId() != null &&
            !offerDto.getId().equals(offerId)) {
            throw new InvalidParameterException("Owner offer id in body does not match id in request url");
        }
        if (offerDto.getUserId() != null &&
                !currentOffer.getUser().getId().equals(offerDto.getUserId())) {
            throw new InvalidParameterException("Cannot change the id of offer's user");
        }

        offerDto.setId(offerId);

        PetOwnerOffer updated = petOwnerOfferMapper.mapToEntity(offerDto);
        User user = userRepository.findById(offerDto.getUserId()).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        updated.setUser(user);

        updated.setPictures(currentOffer.getPictures()); // not updating the pictures

        petOwnerOfferRepository.save(updated);

        updatePets(updated, offerDto.getPets());
        return petOwnerOfferMapper.mapToDto(updated);
    }

    public void deleteOfferById(Long id) {
        PetOwnerOffer offerToDelete = petOwnerOfferRepository.findById(id).orElse(null);
        if(offerToDelete != null) {
            List<Picture> offerPictures = offerToDelete.getPictures();
            for (Picture picture : offerPictures) {
                pictureService.deleteFile(picture.getFilepath());
            }
        }
        petOwnerOfferRepository.deleteById(id);
    }

    private void linkOfferToUser(PetOwnerOffer newOffer, PetOwnerOfferDTO newOfferDto) {
        Long userId = newOfferDto.getUserId();
        User offerUser = userRepository.findById(userId).orElse(null);
        if(offerUser == null) {
            throw new ResourceNotFoundException("No user with id: " + userId);
        }
        newOffer.setUser(offerUser);
    }

    private void addPetsToOffer(PetOwnerOffer newOffer, PetOwnerOfferDTO newOfferDto) {
        List<PetDTO> petsDTOs = newOfferDto.getPets();
        for (PetDTO petDTO : petsDTOs) {
            Pet pet = petService.createPetOwner(petDTO, newOffer);
            newOffer.getPets().add(pet);
        }
    }

    private void updatePets(PetOwnerOffer offerToUpdate, List<PetDTO> petDTOs) {

        petService.deletePetsFromOffer(offerToUpdate.getId(), true);
        List<Pet> petsToSave = new ArrayList<>();
        for(PetDTO petDTO: petDTOs){
            Pet pet = petService.createPetOwner(petDTO, offerToUpdate);
            petsToSave.add(pet);
        }
        offerToUpdate.setPets(petsToSave);
    }
}