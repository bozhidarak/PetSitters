package com.example.backend.controller;

import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.service.PetSitterOfferService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/petSitterOffers")
public class PetSitterOfferController {

   private final PetSitterOfferService offerService;

    public PetSitterOfferController(PetSitterOfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetSitterOfferDTO> getOfferById(@PathVariable Long id){
        try {
            PetSitterOfferDTO offerDTO = offerService.getOfferById(id);
            return ResponseEntity.ok(offerDTO);
        }
        catch(ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
