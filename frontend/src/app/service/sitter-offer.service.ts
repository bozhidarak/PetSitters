import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitterOffer } from '../../models/sitter-offer-model';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { User } from '../../models/new-user-model';

@Injectable({
  providedIn: 'root'
})
export class SitterOfferService {
    
  constructor(private http: HttpClient) {}

  getSitterOffers(): Observable<SitterOffer[]> {
    return this.http.get<SitterOffer[]>(`api/petSitterOffers`);
  }

  public getOfferById(id: number): Observable<SitterOffer> {
    return this.http.get<SitterOffer>(`api/petSitterOffers/${id}`);
  }
}
