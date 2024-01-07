import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { PetSittersPageComponent } from '../pet-sitters-page/pet-sitters-page.component';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { getFirestore, collection, where, getDocs, query } from '@angular/fire/firestore';
import { Owner } from '../../src/models/user-model';


@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatToolbarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  loggedIn: boolean = true;
  userName: string = "";
  picture: string = "";

  constructor(private router:Router){
      const auth = getAuth();
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.loggedIn = true;
          this.getUserName();
        } else {
          this.loggedIn = false;
        }
      });
  }

  async getUserName(){
      const db = getFirestore();
      const usersRef = collection(db, "users");
      // create query from uid from auth
     const q = query(usersRef, where("email", "==", getAuth().currentUser?.email));
      const querySnapshot = await getDocs(q);
     this.userName = querySnapshot.docs[0].data()['name'];
      this.picture = querySnapshot.docs[0].data()['profilePic']; // profilepic
      //console.log(querySnapshot.docs[0].data());
      
    }

  NavigateToSitters(){
    this.router.navigate(['pet-sitters'])
  }

  NavigateToOwners(){
    this.router.navigate(['owners-page'])
  }

  NavigateToRegistration(){
    this.router.navigate(['registration'])
  }

  NavigateToLogin(){
    this.router.navigate(['login'])
  }

  NavigateToHowPage(){
    this.router.navigate(['how-page'])
  }

  NavigateToEditProfile(){
    this.router.navigate(['edit-profile'])
  }
}
