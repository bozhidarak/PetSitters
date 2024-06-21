import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitterOffer } from '../../models/sitter-offer-model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitterOfferService {

  constructor(private http: HttpClient) {}

  getSitterOffers(currentPage: number, pageSize: number): Observable<SitterOffer[]> {
    let params = new HttpParams();
    if(currentPage !== undefined && currentPage !== null && currentPage >= 0) {
      params = params.set('page', currentPage.toString());
    }
    if(pageSize !== undefined && pageSize !== null && pageSize >= 0) {
      params = params.set('limit', pageSize.toString());
    }
    return this.http.get<SitterOffer[]>(`api/petSitterOffers`, { params });
  }

  getOfferById(id: number): Observable<SitterOffer> {
    return this.http.get<SitterOffer>(`api/petSitterOffers/${id}`);
  }

  getSitterOfferByUserId(userId: number): Observable<SitterOffer> {

    return this.http.get<SitterOffer>(`api/petSitterOffers/user/${userId}`);
  }

  createOffer(newSitterOffer: SitterOffer, pictures: File[]): Observable<SitterOffer> {
    console.log("creating offer");
    const formData = new FormData();

    formData.append('offerDto', new Blob([JSON.stringify(newSitterOffer)], {type: 'application/json'}));

    if (pictures && pictures.length > 0) {
      for (let picture of pictures) {
        formData.append('pictures', picture, picture.name);
      }
    }
    console.log(newSitterOffer);
    return this.http.post<SitterOffer>("api/petSitterOffers", formData);
  }

  deleteOffer(offerId: number) {
    return this.http.delete<void>(`api/petSitterOffers/${offerId}`);
  }
}
