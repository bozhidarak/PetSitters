package com.example.backend.controller;

import com.example.backend.dto.FilterRequestDTO;
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
    public ResponseEntity<List<PetOwnerOfferDTO>> getAllOffers(@RequestParam(required = false, defaultValue = "0") Integer page,
                                                               @RequestParam(required = false, defaultValue = "9") Integer limit){
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

    @PostMapping("/filter" )
    public ResponseEntity<List<PetOwnerOfferDTO>> filterOffers(@RequestBody FilterRequestDTO filterRequest,
                                                               @RequestParam(required = false, defaultValue = "0") Integer page,
                                                               @RequestParam(required = false, defaultValue = "9") Integer limit) {
        List<String> pets = filterRequest.getPets();
        LocalDate startDate = filterRequest.getStartDate();
        LocalDate endDate = filterRequest.getEndDate();

        List<PetOwnerOfferDTO> filteredOffers = petOwnerOfferService.findFilteredOffers(pets, startDate, endDate, page, limit);
        return ResponseEntity.ok(filteredOffers);
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
