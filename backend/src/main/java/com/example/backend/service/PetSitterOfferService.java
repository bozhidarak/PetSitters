package com.example.backend.service;

import com.example.backend.dto.PetDTO;
import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.entity.Pet;
import com.example.backend.entity.PetSitterOffer;
import com.example.backend.entity.User;
import com.example.backend.enums.PetType;
import com.example.backend.mapper.PetSitterOfferMapper;
import com.example.backend.repository.PetSitterOfferRepository;
import com.example.backend.repository.UserRepository;
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
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user with id: " + userId));
        if(offerRepository.existsByUserId(userId)){
            throw new ResourceNotFoundException("This user already has an offer -> edit the existing offer instead");
        }
        offerEntity.setUser(user);
        List<PetDTO> petDTOs = offerDTO.getPets();
        List<Pet> pets = new ArrayList<>();
        for(PetDTO petDTO : petDTOs){
            Pet pet = petService.createPet(petDTO);
            pets.add(pet);
        }
        offerEntity.setPets(pets);
        PetSitterOffer offer = offerRepository.save(offerEntity);
        if(!pictures.isEmpty()) {
            for (MultipartFile picture : pictures) {
                pictureService.addPictureToOffer(picture, offer, null);
            }
        }
        return offerMapper.toDTO(offer);
    }

    public PetSitterOfferDTO updateOffer(Long id, PetSitterOfferDTO offerDTO){
        PetSitterOffer savedOffer = offerRepository.findById(id).orElse(null);
        offerDTO.setUserId(id);
        PetSitterOffer toSave = offerMapper.toEntity(offerDTO);
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        toSave.setUser(user);
        if(savedOffer == null){
            return offerMapper.toDTO(offerRepository.save(toSave));
        }
       if(!offerDTO.getUserId().equals(savedOffer.getUser().getId())){
           throw new InvalidParameterException("The user id doesn't belong to this offer");
       }
       updatePets(toSave, offerDTO.getPets());
        return offerMapper.toDTO(toSave);
    }

    public void deleteOffer(Long id){
        if(!offerRepository.existsById(id)){
            throw new ResourceNotFoundException("No pet sitter offer with id: " + id);
        }
        offerRepository.deleteById(id);
    }

    public void updatePets(PetSitterOffer toSave, List<PetDTO> petDTOs){
        List<Pet> currPets = toSave.getPets();
        Map<PetType, Pet> petMap = currPets.stream().collect(Collectors.toMap(Pet::getPetType,pet ->pet));
// need to update the petdto to hold the offerid or smth
        for(PetDTO petDTO: petDTOs){
            PetType petType = petDTO.getPetType();
            if(!petMap.containsKey(petType)){
                Pet pet = petService.createPet(petDTO);
                toSave.getPets().add(pet);
            }
            else{
                // petdto -> count and set it in the pet
                //vzimam petId na pettype w mapa
                Long petId = petMap.get(petType).getId();
                Optional<Pet> petOpt = toSave.getPets().stream()
                        .filter(pet -> pet.getId().equals(petId))
                        .findFirst();
                if(petOpt.isPresent()){
                    petOpt.get().setNumberOfPets(petDTO.getNumberOfPets());
                    petService.updatePet(petOpt.get());
                }
                else{
                    throw new ResourceNotFoundException("Pet not found");
                }
            }

        }
    }
}
