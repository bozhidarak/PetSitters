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
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'owners-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatGridListModule, MatButtonModule, FiltersComponent, OwnerOfferCardComponent, MatPaginatorModule],
  templateUrl: './owner-offers-page.component.html',
  styleUrl: './owner-offers-page.component.css'
})

export class OwnerOffersPageComponent implements OnInit{
  petOwnerOffers: PetOwnerOffer[] = [];
  loggedIn: boolean = true;
  pageSize: number = 9;
  currentPage: number = 0;

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
    this.getOwnerOffers(this.currentPage, this.pageSize);
  }

  getOwnerOffers(currentPage: number, pageSize: number) {
    this.ownerOfferService.findAll(currentPage, pageSize).subscribe( (data) => {
        this.petOwnerOffers = data;
      })
  }

  navigateToDetails(petOwnerOffer: PetOwnerOffer){
    this.sharingOfferService.setPetOwnerOffer(petOwnerOffer);
    const id = petOwnerOffer.id;
    this.router.navigate(['owner-offer-details', id]);
  }

  navigateToRegister(){
    this.router.navigate(['registration']);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getOwnerOffers(this.currentPage, this.pageSize);
  }
}
