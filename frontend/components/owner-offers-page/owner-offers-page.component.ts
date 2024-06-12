import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { Owner, Sitter, User } from '../../src/models/user-model';
// import { getFirestore, collection, where, getDocs,query } from '@angular/fire/firestore';
// import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'owners-page',
  standalone: true,
  imports: [CommonModule,NavBarComponent, PetCardComponent,MatGridListModule,MatButtonModule,FiltersComponent],
  templateUrl: './owner-offer-page.component.html',
  styleUrl: './owner-offer-page.component.css'
})

export class OwnersPageComponent {
  owners: Owner[] = [];
  loggedIn: boolean = true;

  constructor(private router:Router){
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

  // async getOwners(){
  //   const db = getFirestore();
  //   const usersRef = collection(db, "users");
  //   const q = query(usersRef, where("userType", "==", 2), where("createAd", "==", true));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     this.owners.push(doc.data() as Owner);
  //   });
  // }

  navigateToDetails(petOwnerOffer: Owner){
    // const id = petOwnerOffer.id;
    // this.router.navigate(['owner-offer-details', id]);
  }

  navigateToRegister(){
    this.router.navigate(['registration']);
  }
}
