import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Review} from "../../src/models/review-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../src/app/service/review.service";

@Component({
  selector: 'create-review',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgForOf,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {
  description = new FormControl('', [Validators.required, Validators.minLength(2)]);
  stars: number = 0;
  isSubmitPressed: boolean = false;

  constructor(private reviewService: ReviewService,
              private route: ActivatedRoute, private router: Router) {
  }

  setStars(value: number) {
    this.stars = value;
  }

  handleReviewCreation(event: Event) {
    event.preventDefault();
    this.isSubmitPressed = true;
    if(this.stars < 1 || !this.description) {
      return
    }
    const reviewedUserId = Number(this.route.snapshot.paramMap.get('userId'));
    const authorId = Number(localStorage.getItem("userId"));
    const newReview = new Review(this.stars, this.description.value!, reviewedUserId, authorId);
    this.reviewService.createReview(newReview).subscribe();
    this.router.navigate(['user-profile', reviewedUserId]);
  }
}
