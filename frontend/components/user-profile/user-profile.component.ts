import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule } from '@angular/material/checkbox';
// import { arrayRemove, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc } from '@firebase/firestore';
// import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
// import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from '@firebase/storage';
import { Owner, PetOwnerOffer, Sitter, User, UserType } from '../../src/models/user-model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PetCardComponent } from '../pet-card/pet-card.component';


@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [NavBarComponent, MatGridListModule, PetCardComponent, CommonModule, MatFormFieldModule, MatButtonModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatRadioModule, MatCheckboxModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  offers: Owner[] = [];

  constructor(private router:Router){ }

  createPetSitterOffer(){}
  createPetOwnerOffer(){
    this.router.navigate(['create-owner-offer'])
  }
  navigateToDetails(offer: any){}

  navigateToHome(){
    this.router.navigate(['home-page']);
  }

}

