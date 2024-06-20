import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from "../../src/models/review-model";
import { MatGridListModule } from '@angular/material/grid-list';
import {ReviewService} from "../../src/app/service/review.service";
import {ActivatedRoute} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'reviews-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
  reviews: Review[] = [] as Review[];
  reviewedUserId: number = 0;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.reviewedUserId = Number(this.route.snapshot.paramMap.get('id'));
    this.getReviews();
  }

  getReviews() {
    return this.reviewService.findReviewsForUser(this.reviewedUserId).subscribe((reviews) => {
      this.reviews = reviews;
    })
  }

  getStarsRange(starsCount: number) :number[] {
    return new Array(starsCount).fill(0);
  }
}
