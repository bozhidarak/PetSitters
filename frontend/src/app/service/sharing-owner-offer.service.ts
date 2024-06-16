import { Injectable } from '@angular/core';
import {PetOwnerOffer} from "../../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class SharingOwnerOfferService {
  petOwnerOffer: PetOwnerOffer = {} as PetOwnerOffer;

  constructor() { }

  setPetOwnerOffer(petOwnerOffer: PetOwnerOffer) {
    this.petOwnerOffer = petOwnerOffer;
  }

  getPetOwnerOffer(): PetOwnerOffer {
    return this.petOwnerOffer;
  }
}
