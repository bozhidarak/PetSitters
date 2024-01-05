import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SitterCardComponent } from '../sitter-card/sitter-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { Sitter } from '../../src/models/user-model';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';


@Component({
  selector: 'pet-sitters',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, SitterCardComponent, MatGridListModule, FiltersComponent],
  templateUrl: './pet-sitters-page.component.html',
  styleUrl: './pet-sitters-page.component.css'
})

export class PetSittersPageComponent {

  sitters: Sitter[] = [];
  loggedIn: boolean = false;

  constructor(private router:Router){
    this.getSitters();
    const auth = getAuth();
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        // User is signed out
        this.loggedIn = false;
      }
    });
  }

  async getSitters(){
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userType", "==", 1), where("createAd", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.sitters.push(doc.data() as Sitter);
    });
  }

  navigateToDetails(sitter: Sitter){
    this.router.navigate(['sitter-details', sitter.email])
  }

  navigateToRegister(){
    this.router.navigate(['registration']);
  }
}
