import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PetOwnerOffer} from "../../models/owner-offer-model";

@Injectable({
  providedIn: 'root'
})
export class OwnerOfferService {
  apiUrl: string = '/api/petOwnerOffers';

  constructor(private http: HttpClient) { }

  public findAll(currentPage: number, pageSize: number): Observable<PetOwnerOffer[]> {
    let params = new HttpParams();
    if(currentPage !== undefined && currentPage !== null && currentPage >= 0) {
      params = params.set('page', currentPage.toString());
    }
    if(pageSize !== undefined && pageSize !== null && pageSize >= 0) {
      params = params.set('limit', pageSize.toString());
    }
    return this.http.get<PetOwnerOffer[]>(this.apiUrl, { params });
  }

  public findById(offerId: number) : Observable<PetOwnerOffer> {
    return this.http.get<PetOwnerOffer>(this.apiUrl + '/' + offerId);
  }

  public findOffersByUserId(userId: number): Observable<PetOwnerOffer[]> {

    return this.http.get<PetOwnerOffer[]>(this.apiUrl + '/user/' + userId);
  }

  public findFilteredOffers(filters: {"pets": string[], "startDate": string | null, "endDate": string | null},
                            currentPage: number, pageSize: number) {
    let params = new HttpParams();
    if(currentPage !== undefined && currentPage !== null && currentPage >= 0) {
      params = params.set('page', currentPage.toString());
    }
    if(pageSize !== undefined && pageSize !== null && pageSize >= 0) {
      params = params.set('limit', pageSize.toString());
    }
    return this.http.post<PetOwnerOffer[]>(this.apiUrl + '/filter', filters, { params: params } )
  }


  public createOffer(newOwnerOffer: PetOwnerOffer, pictures: File[]): Observable<PetOwnerOffer> {
    const formData = new FormData();

    formData.append('newOfferDto', new Blob([JSON.stringify(newOwnerOffer)], {type: 'application/json'}));

    if (pictures && pictures.length > 0) {
      for (let picture of pictures) {
        formData.append('pictures', picture, picture.name);
      }
    }
    return this.http.post<PetOwnerOffer>(this.apiUrl, formData);
  }

  public deleteOffer(offerId: number) {
    return this.http.delete<void>(this.apiUrl + '/' + offerId);
  }
}



