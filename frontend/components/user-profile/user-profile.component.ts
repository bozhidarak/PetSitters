import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule } from '@angular/material/checkbox';
// import { arrayRemove, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc } from '@firebase/firestore';
// import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
// import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from '@firebase/storage';
import { Owner, Sitter, User, UserType } from '../../src/models/user-model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {ReviewsListComponent} from "../reviews-list/reviews-list.component";
import { UserService } from '../../src/app/service/user.service';
import { SitterOffer } from '../../src/models/sitter-offer-model';
import { OwnerOfferCardComponent } from '../owner-offer-card/owner-offer-card.component';
import { OwnerOfferService } from '../../src/app/service/owner-offer-service.service';
import { SitterOfferService } from '../../src/app/service/sitter-offer.service';
import { SitterCardComponent } from '../sitter-offer-card/sitter-offer-card.component';
import { PetOwnerOffer } from '../../src/models/owner-offer-model';


@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [NavBarComponent, MatGridListModule, OwnerOfferCardComponent,SitterCardComponent, CommonModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReviewsListComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  offers: Owner[] = [];
  showReviews: boolean = false;
  ownerOffers: PetOwnerOffer[] = [] as PetOwnerOffer[];
  sitterOffer: SitterOffer | undefined = [] as any;
  user: User | undefined;
  userId: number;
  isMyProfile: boolean = false;


  constructor(private activeRoute:ActivatedRoute, private router: Router,
    private userService: UserService, private ownerOfferService: OwnerOfferService,
    private sitterOfferService: SitterOfferService) {

    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.userId = Number(id);
    if(this.userId == Number(localStorage.getItem('userId'))){
      this.isMyProfile = true;
    }
    this.getUser();
    this.getOwnerOffers();
    this.getsitterOffer();
  }

  ngOnInit() {
    this.getOwnerOffers();
    this.getsitterOffer()
  }

  getUser(){
        this.userService.getUserById(this.userId).subscribe(
        (data: User | undefined) => {
          this.user = data;
        });
  }

  getsitterOffer(){
    this.sitterOfferService.getSitterOfferByUserId(this.userId).subscribe(
      (data: SitterOffer | undefined) => {
        this.sitterOffer = data;
      });
  }

  getOwnerOffers(){
    this.ownerOfferService.findOffersByUserId(this.userId).subscribe(
      data => {
        this.ownerOffers = data;
      });
  }

  createReview(){
    this.router.navigate(['create-review', this.userId])
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['home-page']);
  }

  createPetSitterOffer(){
    this.router.navigate(['create-sitter-offer'])
  }

  createPetOwnerOffer(){
    this.router.navigate(['create-owner-offer'])
  }

  navigateToOwnerOfferDetails(offerId: number){
    console.log("in nav to owner offer")
    this.router.navigate(['owner-offer-details', offerId])
  }

  navigateToDetails(offer: any){
    this.router.navigate(['sitter-details', this.sitterOffer?.offerId])
  }

  navigateToHome(){
    this.router.navigate(['home-page']);
  }

  handleShowReviews() {
    this.showReviews = !this.showReviews;
  }
}

