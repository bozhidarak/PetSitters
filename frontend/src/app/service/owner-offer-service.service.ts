import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PetOwnerOffer} from "../../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class OwnerOfferService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PetOwnerOffer[]> {
    return this.http.get<PetOwnerOffer[]>('api/petOwnerOffers');
  }

  public findById(offerId: number) : Observable<PetOwnerOffer> {
    console.log(`api/petOwnerOffers/${offerId}`);
    return this.http.get<PetOwnerOffer>(`api/petOwnerOffers/${offerId}`);
  }

  public createOffer(newOwnerOffer: PetOwnerOffer): Observable<PetOwnerOffer> {
    return this.http.post<PetOwnerOffer>('api/petOwnerOffers', newOwnerOffer);
  }
}
