import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { PetOwnerOffer } from '../../src/models/owner-offer-model';
import { OwnerOfferCardComponent } from "../owner-offer-card/owner-offer-card.component";
import { OwnerOfferService } from '../../src/app/service/owner-offer-service.service'
import { SharingOwnerOfferService } from '../../src/app/service/sharing-owner-offer.service';
// import { getFirestore, collection, where, getDocs,query } from '@angular/fire/firestore';
// import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'owners-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatGridListModule, MatButtonModule, FiltersComponent, OwnerOfferCardComponent],
  templateUrl: './owner-offers-page.component.html',
  styleUrl: './owner-offers-page.component.css'
})

export class OwnerOffersPageComponent implements OnInit{
  petOwnerOffers: PetOwnerOffer[] = [];
  loggedIn: boolean = true;
  page: number = 1;
  limit: number = 9;

  constructor(private ownerOfferService: OwnerOfferService,
              private sharingOfferService: SharingOwnerOfferService,
              private router:Router)
  {
    // this.getOwners();
    // const auth = getAuth();

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.loggedIn = true;
    //   } else {
    //     // User is signed out
    //     this.loggedIn = false;
    //   }
    // });

  }

  ngOnInit() {
    this.getOwnerOffers();
  }

  getOwnerOffers() {
    this.ownerOfferService.findAll().subscribe( (data) => {
        this.petOwnerOffers = data;
      })
  }

  // async getOwners(){
  //   const db = getFirestore();
  //   const usersRef = collection(db, "users");
  //   const q = query(usersRef, where("userType", "==", 2), where("createAd", "==", true));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     this.owners.push(doc.data() as Owner);
  //   });
  // }

  navigateToDetails(petOwnerOffer: PetOwnerOffer){
    this.sharingOfferService.setPetOwnerOffer(petOwnerOffer);
    const id = petOwnerOffer.id;
    this.router.navigate(['owner-offer-details', id]);
  }

  navigateToRegister(){
    this.router.navigate(['registration']);
  }
}
