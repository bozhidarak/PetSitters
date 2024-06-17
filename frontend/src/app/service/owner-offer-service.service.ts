import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PetOwnerOffer} from "../../models/owner-offer-model";
import {Pet} from "../../models/sitter-offer-model";

@Injectable({
  providedIn: 'root'
})
export class OwnerOfferService {
  apiUrl: string = '/api/petOwnerOffers';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PetOwnerOffer[]> {
    return this.http.get<PetOwnerOffer[]>(this.apiUrl);
  }

  public findById(offerId: number) : Observable<PetOwnerOffer> {
    console.log(`api/petOwnerOffers/${offerId}`);
    return this.http.get<PetOwnerOffer>(this.apiUrl + '/' + offerId);
  }

  public createOffer(newOwnerOffer: PetOwnerOffer, pictures: File[]): Observable<PetOwnerOffer> {
    const formData = new FormData();
    // formData.append('newOfferDto', JSON.stringify(newOwnerOffer));
    // if (pictures && pictures.length > 0) {
    //   for (let picture of pictures) {
    //     formData.append('pictures', picture, picture.name);
    //   }
    // }
    let pets = [{petType:"DOG", numberOfPets: 2}] as Pet[];
    // let offer = new PetOwnerOffer('alabala', 'plovdiv', ,Date(21,3,2024),2,pets)
    return this.http.put<PetOwnerOffer>(this.apiUrl, formData);
  }
}
