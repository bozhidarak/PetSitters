import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { SitterCardComponent } from '../sitter-offer-card/sitter-offer-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SitterOffer } from '../../src/models/sitter-offer-model';
import { SitterOfferService } from '../../src/app/service/sitter-offer.service';
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'pet-sitters',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, SitterCardComponent, MatGridListModule, FiltersComponent, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './pet-sitter-offers-page.component.html',
  styleUrl: './pet-sitter-offers-page.component.css',
  providers: [SitterOfferService]
})

export class PetSittersPageComponent {

  sitters: SitterOffer[] | undefined = [];
  loggedIn: boolean = !!localStorage.getItem('userId'); //true if user is not null or empty
  pageSize: number = 9;
  currentPage: number = 0;
  numOfItems: number = 10;

  constructor(private router:Router, private sitterOfferService: SitterOfferService){
    this.getOffers(this.currentPage, this.pageSize);
  }

  getOffers(currentPage: number, pageSize: number){
     this.sitterOfferService.getSitterOffers(currentPage, pageSize).subscribe((data: SitterOffer[] | undefined) => {
      this.sitters = data;
       if(this.sitters?.length! < 9) {
         this.numOfItems = this.sitters!.length;
       } else{
         this.numOfItems = 10;
       }
      for (let offer of this.sitters!) {
        console.log(offer);
      }
    });
  }


  navigateToDetails(sitter: SitterOffer) {
    if(this.loggedIn) {
      console.log(localStorage.getItem('userId'));
      this.router.navigate(['sitter-details', sitter.offerId])
    }
  }

  navigateToRegister() {
    this.router.navigate(['registration'])
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getOffers(this.currentPage, this.pageSize);
  }

  onFiltersApplied(filters: {pets: string[], startDate: string | null, endDate: string | null}) {
    console.log("FILTERS", filters);
    this.currentPage = 0;
    this.pageSize = 9;
    this.sitterOfferService.getFilteredOffers(filters.pets, filters.startDate, filters.endDate, this.currentPage, this.pageSize)
                            .subscribe((data: SitterOffer[] | undefined) => {
                                                  this.sitters = data;});
  }

}
