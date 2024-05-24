package com.example.backend.controller;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.service.PetOwnerOfferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.List;

@RestController
@RequestMapping("/petOwnerOffers")
public class PetOwnerOfferController {
    private final PetOwnerOfferService petOwnerOfferService;
    @Autowired
    public PetOwnerOfferController(PetOwnerOfferService petOwnerOfferService) {
        this.petOwnerOfferService = petOwnerOfferService;
    }

    @GetMapping
    public ResponseEntity<List<PetOwnerOfferDTO>> getAllOffers(){
        return new ResponseEntity<>(petOwnerOfferService.getAllOffers(), HttpStatus.OK );
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
    @PostMapping
    public ResponseEntity<PetOwnerOfferDTO> createOffer(@Valid @RequestBody PetOwnerOfferDTO newOfferDto) {
        PetOwnerOfferDTO savedOffer = petOwnerOfferService.createOffer(newOfferDto);
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
