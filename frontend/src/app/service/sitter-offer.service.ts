import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitterOffer } from '../../models/sitter-offer-model';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { User } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SitterOfferService {

  constructor(private http: HttpClient) {}

  getSitterOffers(): Observable<SitterOffer[]> {
    return this.http.get<SitterOffer[]>(`api/petSitterOffers`);
  }

  getOfferById(id: number): Observable<SitterOffer> {
    return this.http.get<SitterOffer>(`api/petSitterOffers/${id}`);
  }

  getSitterOfferByUserId(userId: number): Observable<SitterOffer> {
    return this.http.get<SitterOffer>(`api/petSitterOffers/user/${userId}`);
  }

  createOffer(newSitterOffer: SitterOffer, pictures: File[]): Observable<SitterOffer> {
    //return this.http.post<SitterOffer>(`api/petSitterOffers`, newSitterOffer);

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
}
