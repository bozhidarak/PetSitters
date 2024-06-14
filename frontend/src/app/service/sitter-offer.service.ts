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

  // public getOffers(): Observable<SitterOffer[]> {
  //   return this.http.get<SitterOffer[]>('api/petSitterOffers').pipe(
  //     // for each offer, get the user details by the user/{userId} endpoint
  //     switchMap(offers => {
  //       return this.http.get<User[]>('api/users').pipe(
  //         map(users => offers.map(offer => {
  //           const user = users.find(user => user.id === offer.userId);
  //           return {
  //             ...offer,
  //             userName: user?.name,
  //             userEmail: user?.email,
  //             userLocation: user?.location,
  //             userProfilePic: user?.profilePic
  //           }
  //         }))
  //       )
  // })
  //   );
// }

getSitterOffers(): Observable<SitterOffer[]> {
  // return this.http.get<SitterOffer[]>('api/petSitterOffers').pipe(
  //   switchMap(offers => {
  //     return forkJoin(
  //       offers.map(offer => this.http.get<User>(`api/users/${offer.userId}`).pipe(
  //         map(user => ({
  //           ...offer,
  //           userName: user.name,
  //           userEmail: user.email,
  //           userLocation: user.location,
  //           userProfilePic: user.profilePic
  //           }))
  //         ))
  //       )
  //     })
  //   );
    return this.http.get<SitterOffer[]>(`api/petSitterOffers`);
    
  }

  public getOfferById(id: number): Observable<SitterOffer> {
    return this.http.get<SitterOffer>(`api/petSitterOffers/${id}`).pipe(
      switchMap(offer => this.http.get<User>(`api/users/${offer.userId}`).pipe(
          map(user => ({
              ...offer,
              userName: user.name,
              userEmail: user.email,
              userLocation: user.location,
              userProfilePic: user.profilePic
          }))
      ))
    );
  }
}
