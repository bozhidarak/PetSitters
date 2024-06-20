import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../../models/review-model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl: string = '/api/reviews';

  constructor(private http: HttpClient) { }

  findReviewsForUser(userId: number) {
    return this.http.get<Review[]>(this.apiUrl + '/user/' + userId);
  }
}
