import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {PetOwnerOffer} from "../../src/models/owner-offer-model";
import { Router } from '@angular/router';


@Component({
  selector: 'owner-offer-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgForOf, NgIf],
  templateUrl: './owner-offer-card.component.html',
  styleUrl: './owner-offer-card.component.css'
})
export class OwnerOfferCardComponent {
  @Input() ownerOffer: PetOwnerOffer = {} as PetOwnerOffer;

  constructor(private router: Router) {}

  navigateToUser() {
    if(!!localStorage.getItem('userId')){
    this.router.navigate(['user-profile', this.ownerOffer!.userId]);
    }
  }
}
