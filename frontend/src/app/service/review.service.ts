import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../../models/review-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl: string = '/api/reviews';

  constructor(private http: HttpClient) { }

  findReviewsForUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + '/user/' + userId);
  }

  createReview(newReview: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, newReview);
  }
}
