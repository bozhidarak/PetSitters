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
  loggedIn: boolean = !!localStorage.getItem('userId');
  pageSize: number = 9;
  currentPage: number = 0;
  numOfItems: number = 10;

  constructor(private ownerOfferService: OwnerOfferService, private router:Router) {}

  ngOnInit() {
    this.getOwnerOffers(this.currentPage, this.pageSize);
  }

  getOwnerOffers(currentPage: number, pageSize: number) {
    this.ownerOfferService.findAll(currentPage, pageSize).subscribe( (data) => {
        this.petOwnerOffers = data;
        if (this.petOwnerOffers.length < 9) {
          this.numOfItems = this.petOwnerOffers.length;
        } else{
          this.numOfItems = 10;
        }
      })
  }

  navigateToDetails(petOwnerOffer: PetOwnerOffer){
    if(this.loggedIn){
    const id = petOwnerOffer.id;
    this.router.navigate(['owner-offer-details', id]);
    }
  }

  navigateToRegister(){
    this.router.navigate(['registration']);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getOwnerOffers(this.currentPage, this.pageSize);
  }

  onFiltersApplied(filters: {pets: string[], startDate: string | null, endDate: string | null}) {
    console.log(filters);
  }
}
