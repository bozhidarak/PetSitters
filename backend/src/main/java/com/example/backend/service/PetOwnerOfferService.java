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
import com.example.backend.specification.PetOwnerOfferSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.time.LocalDate;
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

    public List<PetOwnerOfferDTO> getAllOffers(Integer page, Integer limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return petOwnerOfferRepository.findAll(pageable)
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

    public List<PetOwnerOfferDTO> getOffersByUserId(Long userId) {
        return petOwnerOfferRepository.findByUserId(userId)
                .stream()
                .map(petOwnerOfferMapper::mapToDto)
                .toList();
    }

    public List<PetOwnerOfferDTO> findFilteredOffers(List<String> petTypes, LocalDate startDate, LocalDate endDate, Integer page, Integer limit) {
        Specification<PetOwnerOffer> spec = Specification
                .where(PetOwnerOfferSpecification.startDateAfter(startDate))
                .and(PetOwnerOfferSpecification.endDateBefore(endDate))
                .and(PetOwnerOfferSpecification.petsWithTypes(petTypes));

        Pageable pageable;
        if (page == null || limit == null) {
            pageable = PageRequest.of(0, 9);
        } else {
            pageable = PageRequest.of(page, limit);
        }

        return petOwnerOfferRepository.findAll(spec, pageable)
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

        updated.setUser(currentOffer.getUser());
        updated.setPictures(currentOffer.getPictures());
        updated.setPets(currentOffer.getPets());

        updatePets(currentOffer, offerDto.getPets());

        petOwnerOfferRepository.save(updated);
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

    public void deleteOfferByUserId(Long id){
        petOwnerOfferRepository.deleteByUserId(id);
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
        List<Pet> currentPets = offerToUpdate.getPets();
        Map<PetType, Pet> currentPetsMap = currentPets.stream()
                .collect(Collectors.toMap(Pet::getPetType, pet -> pet));
        for (PetDTO petDTO : petDTOs) {
            PetType petType = petDTO.getPetType();
            if (!currentPetsMap.containsKey(petType)) {
                Pet pet = petService.createPetOwner(petDTO, offerToUpdate);
                offerToUpdate.getPets().add(pet);
            } else {
                Pet petForUpdate = currentPetsMap.get(petType);
                if (!petForUpdate.getNumberOfPets().equals(petDTO.getNumberOfPets())){
                    petService.updatePetById(petForUpdate.getId(), petDTO.getNumberOfPets());
                }
                currentPetsMap.remove(petType);
            }
        }
        currentPets.removeIf(pet -> currentPetsMap.containsKey(pet.getPetType()));
    }
}