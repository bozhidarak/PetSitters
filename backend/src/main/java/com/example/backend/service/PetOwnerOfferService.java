package com.example.backend.service;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.UserEntity;
import com.example.backend.mapper.PetOwnerOfferMapper;
import com.example.backend.repository.PetOwnerOfferRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;

@Service
public class PetOwnerOfferService {
    private final PetOwnerOfferRepository petOwnerOfferRepository;
    private final UserRepository userRepository;
    private final PetOwnerOfferMapper petOwnerOfferMapper;

    @Autowired
    public PetOwnerOfferService(PetOwnerOfferRepository petOwnerOfferRepository,
                                PetOwnerOfferMapper petOwnerOfferMapper,
                                UserRepository userRepository)
    {
        this.petOwnerOfferRepository = petOwnerOfferRepository;
        this.petOwnerOfferMapper = petOwnerOfferMapper;
        this.userRepository = userRepository;
    }

    public List<PetOwnerOfferDTO> getAllOffers() {
        return petOwnerOfferRepository.findAll()
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
    public PetOwnerOfferDTO createOffer(PetOwnerOfferDTO newOfferDto) {
        PetOwnerOffer newOffer = linkOfferToUser(newOfferDto);
        return petOwnerOfferMapper.mapToDto(petOwnerOfferRepository.save(newOffer));
    }

    public PetOwnerOfferDTO updateOffer(Long offerId, PetOwnerOfferDTO offerDto) {
        PetOwnerOffer currentOffer = petOwnerOfferRepository.findById(offerId).orElse(null);
        if(currentOffer == null) {
            return createOffer(offerDto);
        }
        if(!currentOffer.getUser().getId().equals(offerDto.getUserId())){
            throw new InvalidParameterException("Cannot change the id of offer's user");
        }
        ;
        PetOwnerOffer updatedOffer = petOwnerOfferRepository.save(petOwnerOfferMapper.mapToEntity(offerDto));
        return petOwnerOfferMapper.mapToDto(updatedOffer);
    }

    public void deleteOfferById(Long id) {
        petOwnerOfferRepository.deleteById(id);
    }

    private PetOwnerOffer linkOfferToUser(PetOwnerOfferDTO newOfferDto) {
        PetOwnerOffer newOffer = petOwnerOfferMapper.mapToEntity(newOfferDto);

        Long userId = newOfferDto.getUserId();
        UserEntity offerUser = userRepository.findById(userId).orElse(null);
        if(offerUser == null) {
            throw new ResourceNotFoundException("No user with id: " + userId);
        }
        newOffer.setUser(offerUser);
        return newOffer;
    }
}