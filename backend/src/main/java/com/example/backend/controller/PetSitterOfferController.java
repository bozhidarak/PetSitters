package com.example.backend.controller;

import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.service.PetSitterOfferService;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/petSitterOffers")
public class PetSitterOfferController {

   private final PetSitterOfferService offerService;

    public PetSitterOfferController(PetSitterOfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public ResponseEntity<List<PetSitterOfferDTO>> getAllOffers(@RequestParam(required = false) Integer page,
                                                                @RequestParam(required = false) Integer limit){
        if(page != null && limit != null){
            return ResponseEntity.ok(offerService.getAllOffers(PageRequest.of(page,limit)));
        }
        return ResponseEntity.ok(offerService.getAllOffers());
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

    @GetMapping("/user/{id}")
    public ResponseEntity<PetSitterOfferDTO> getOfferByUserId(@PathVariable Long id){
         try {
             PetSitterOfferDTO offerDTO = offerService.getByUserId(id);
             return ResponseEntity.ok(offerDTO);
         }
         catch (ResourceNotFoundException e){
             System.out.println(e.getMessage());
             return ResponseEntity.ok().build();
         }
    }

    @GetMapping("/filters")
    public List<PetSitterOfferDTO> getOffers(
            @RequestParam(required = false) List<String> petTypes,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd-MM-yyyy") Date availableFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd-MM-yyyy") Date availableUntil,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "9") Integer limit) {
        return offerService.getFilteredOffers(petTypes, availableFrom, availableUntil, page, limit);
    }

    @PostMapping()
    public ResponseEntity<PetSitterOfferDTO> createOffer(@RequestPart(required = false) List<MultipartFile> pictures,
                                                         @RequestPart @Valid PetSitterOfferDTO offerDto){
      PetSitterOfferDTO savedOffer;
       try {
            savedOffer = pictures != null
                   ? offerService.createOffer(offerDto, pictures)
                   : offerService.createOffer(offerDto, Collections.emptyList());
       }
       catch(ResourceNotFoundException e) {
           System.out.println(e.getMessage());
           return ResponseEntity.notFound().build();
       }
        return new ResponseEntity<>(savedOffer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetSitterOfferDTO> updateOffer(@PathVariable Long id,
                                                         @RequestBody @Valid PetSitterOfferDTO offerDto){
        try {
            PetSitterOfferDTO savedOfferDTO = offerService.updateOffer(id, offerDto);
            return ResponseEntity.ok(savedOfferDTO);
        }
        catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
        catch (InvalidParameterException e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable Long id){
        try {
            offerService.deleteOffer(id);
            return ResponseEntity.ok().build();
        }
        catch (ResourceNotFoundException e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

}
