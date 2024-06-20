import {Component, OnInit} from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PetOwnerOffer } from '../../src/models/owner-offer-model';
import {SharingOwnerOfferService} from "../../src/app/service/sharing-owner-offer.service";
import {OwnerOfferService} from "../../src/app/service/owner-offer-service.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'owner-offer-details',
  standalone: true,
  imports: [NavBarComponent, RouterLink, CommonModule,
    MatButtonModule, CarouselModule, MatIconModule, MatCardModule],
  templateUrl: './owner-offer-details.component.html',
  styleUrl: './owner-offer-details.component.css'
})
export class OwnerOfferDetailsComponent implements OnInit{

  petOwnerOffer: PetOwnerOffer | undefined;

  constructor(private sharingOwnerService: SharingOwnerOfferService,
              private ownerOfferService: OwnerOfferService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.petOwnerOffer = this.sharingOwnerService.getPetOwnerOffer();
    if (!this.petOwnerOffer || Object.keys(this.petOwnerOffer).length === 0) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.ownerOfferService.findById(id).subscribe( (offer) => {
        this.petOwnerOffer = offer;
      });
    }
  }
}
