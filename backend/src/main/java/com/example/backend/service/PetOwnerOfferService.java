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
import java.util.*;
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

        if(currentOffer == null) {
            throw new ResourceNotFoundException("PetOwnerOffer for update not found");
        }
        if (offerDto.getId() != null &&
            !offerDto.getId().equals(offerId)) {
            throw new InvalidParameterException("Owner offer id in body does not match id in request url");
        }
        if (offerDto.getUserId() != null &&
            !currentOffer.getUser().getId().equals(offerDto.getUserId())){
            throw new InvalidParameterException("Cannot change the id of offer's user");
        }
        offerDto.setId(offerId);

        PetOwnerOffer updated = petOwnerOfferMapper.mapToEntity(offerDto);
        updatePets(updated, offerDto.getPets());
        PetOwnerOffer updatedOffer = petOwnerOfferRepository.save(updated);
        return petOwnerOfferMapper.mapToDto(updatedOffer);
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
        offerUser.getPetOwnerOffers().add(newOffer);
    }

    private void addPetsToOffer(PetOwnerOffer newOffer, PetOwnerOfferDTO newOfferDto) {
        List<PetDTO> petsDTOs = newOfferDto.getPets();
        for (PetDTO petDTO : petsDTOs) {
            addPetToOffer(newOffer, petDTO);
        }
    }

    private void addPetToOffer(PetOwnerOffer ownerOffer, PetDTO petDTO) {
//        Pet newPet = new Pet();
//        newPet.setPetType(petDTO.getPetType());
//        newPet.setNumberOfPets(petDTO.getNumberOfPets());
//        newPet.setPetOwnerOffer(ownerOffer);
//        ownerOffer.getPets().add(newPet);
        // call petService to save pet to database
//        petService.savePet(newPet);

        Pet pet = petService.createPet(petDTO);
        ownerOffer.getPets().add(pet);
    }

    private void updatePets(PetOwnerOffer offerToUpdate, List<PetDTO> petDTOs) {
        List<Pet> currentPets = offerToUpdate.getPets();
        Map<PetType, Pet> currentPetsMap = currentPets.stream()
                .collect(Collectors.toMap(Pet::getPetType, pet -> pet));

        for (PetDTO petDTO : petDTOs) {
            PetType petType = petDTO.getPetType();
            if (!currentPetsMap.containsKey(petType)) {
                addPetToOffer(offerToUpdate, petDTO);
            } else {
               Long petForUpdateId = currentPetsMap.get(petType).getId();
               // call pet service to update pet by id
//                petService.updatePet(petForUpdateId, petDTO.getNumberOfPets());
                currentPetsMap.remove(petType);
            }
        }
        // will delete pets from database because of orphan removal?
        currentPets.removeIf(pet -> currentPetsMap.containsKey(pet.getPetType()));
    }

}