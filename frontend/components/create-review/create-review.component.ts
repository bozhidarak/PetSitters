import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

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

  setStars(value: number) {
    this.stars = value;
  }

  handleReviewCreation() {
    console.log(this.stars)
    this.isSubmitPressed = true;
    if(this.stars < 1 || !this.description) {
      return
    }

  }
}
