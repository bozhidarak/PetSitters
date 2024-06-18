import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SitterCardComponent } from '../sitter-offer-card/sitter-offer-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
// import { collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { Sitter } from '../../src/models/user-model';
// import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SitterOffer } from '../../src/models/sitter-offer-model';
import { SitterOfferService } from '../../src/app/service/sitter-offer.service';


@Component({
  selector: 'pet-sitters',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, SitterCardComponent, MatGridListModule, FiltersComponent, MatCheckboxModule],
  templateUrl: './pet-sitter-offers-page.component.html',
  styleUrl: './pet-sitter-offers-page.component.css',
  providers: [SitterOfferService]
})

export class PetSittersPageComponent {

  sitters: SitterOffer[] | undefined = [];
  loggedIn: boolean = false;

  constructor(private router:Router, private sitterOfferService: SitterOfferService){
    this.getOffers();
  }

  async getOffers(){
     this.sitterOfferService.getSitterOffers().subscribe((data: SitterOffer[] | undefined) => {
      this.sitters = data;
      for (let offer of this.sitters!) {
        console.log(offer);
      }
    });
  }
  

  navigateToDetails(sitter: SitterOffer) {
    //TODO if(this.loggedIn)
      this.router.navigate(['sitter-details', sitter.offerId])
  }

  navigateToRegister() {
    this.router.navigate(['registration'])
  }
}
