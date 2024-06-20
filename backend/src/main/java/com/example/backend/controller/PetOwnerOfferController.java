package com.example.backend.controller;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.enums.PetType;
import com.example.backend.service.PetOwnerOfferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/petOwnerOffers")
public class    PetOwnerOfferController {
    private final PetOwnerOfferService petOwnerOfferService;
    @Autowired
    public PetOwnerOfferController(PetOwnerOfferService petOwnerOfferService) {
        this.petOwnerOfferService = petOwnerOfferService;
    }

    @GetMapping
    public ResponseEntity<List<PetOwnerOfferDTO>> getAllOffers(@RequestParam(required = false) Integer page,
                                                               @RequestParam(required = false) Integer limit){
        return new ResponseEntity<>(petOwnerOfferService.getAllOffers(page, limit), HttpStatus.OK );
    }
    @GetMapping("/{id}")
    public ResponseEntity<PetOwnerOfferDTO> getOfferByID(@PathVariable Long id) {
        try{
            PetOwnerOfferDTO offer = petOwnerOfferService.getOfferById(id);
            return new ResponseEntity<>(offer, HttpStatus.OK);
        }
        catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PetOwnerOfferDTO>> getOffersByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(petOwnerOfferService.getOffersByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/pet")
    public ResponseEntity<List<PetOwnerOfferDTO>> getOffersByPetType(@RequestParam List<PetType> petTypes,
                                                                     @RequestParam(required = false) Integer page,
                                                                     @RequestParam(required = false) Integer limit) {
        List<PetOwnerOfferDTO> petOwnerOffers = petOwnerOfferService.getOffersByPetType(petTypes, page, limit);
        return new ResponseEntity<>(petOwnerOffers, HttpStatus.OK);
    }

    @GetMapping("/datesAfter/{startDate}")
    public ResponseEntity<List<PetOwnerOfferDTO>> getOffersAfter(@PathVariable LocalDate startDate,
                                                                 @RequestParam(required = false) Integer page,
                                                                 @RequestParam(required = false) Integer limit)
    {
        List<PetOwnerOfferDTO> offers = petOwnerOfferService.getOffersAfter(startDate, page, limit);
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    @GetMapping("/datesBefore/{endDate}")
    public ResponseEntity<List<PetOwnerOfferDTO>> getOffersBefore(@PathVariable LocalDate endDate,
                                                                  @RequestParam(required = false) Integer page,
                                                                  @RequestParam(required = false) Integer limit)
    {
        List<PetOwnerOfferDTO> offers = petOwnerOfferService.getOffersBefore(endDate, page, limit);
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PetOwnerOfferDTO> createOffer(@RequestPart(required = false) List<MultipartFile> pictures,
                                                        @RequestPart @Valid PetOwnerOfferDTO newOfferDto) {
        PetOwnerOfferDTO savedOffer = pictures != null
                ? petOwnerOfferService.createOffer(newOfferDto, pictures)
                : petOwnerOfferService.createOffer(newOfferDto, Collections.emptyList());
        return new ResponseEntity<>(savedOffer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetOwnerOfferDTO> updateOffer(@PathVariable Long id,
                                                        @Valid @RequestBody PetOwnerOfferDTO offerDto) {
        try {
            PetOwnerOfferDTO offerDTO = petOwnerOfferService.updateOffer(id, offerDto);
            return new ResponseEntity<>(offerDTO, HttpStatus.OK);
        }
        catch (ResourceNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        catch (InvalidParameterException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOfferById(@PathVariable Long id) {
        petOwnerOfferService.deleteOfferById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
