import { Injectable } from '@angular/core';
import {PetOwnerOffer} from "../../models/owner-offer-model";

@Injectable({
  providedIn: 'root'
})
export class SharingOwnerOfferService {
  petOwnerOffer: PetOwnerOffer | undefined;

  constructor() { }

  setPetOwnerOffer(petOwnerOffer: PetOwnerOffer) {
    this.petOwnerOffer = petOwnerOffer;
  }

  getPetOwnerOffer(): PetOwnerOffer | undefined {
    return this.petOwnerOffer;
  }
}
