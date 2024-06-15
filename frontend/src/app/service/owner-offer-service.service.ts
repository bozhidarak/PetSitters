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
}
