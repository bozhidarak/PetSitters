import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CarouselModule } from '@coreui/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Owner, Sitter } from '../../src/models/user-model';
import { SitterOffer } from '../../src/models/sitter-offer-model';
import { SitterOfferService } from '../../src/app/service/sitter-offer.service';
// import { getFirestore, collection, where, getDocs, query } from '@angular/fire/firestore';

@Component({
  selector: 'sitter-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule,
     MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './sitter-offer-details.component.html',
  styleUrl: './sitter-offer-details.component.css'
})
export class SitterDetailsComponent {

  sitterofferId: number;
  sitterOffer: SitterOffer | undefined;
  sitterOfferservice: SitterOfferService;

  constructor(private route: ActivatedRoute, private sitterOfferService: SitterOfferService, private router: Router) {
    this.sitterOfferservice = sitterOfferService;
    const id = this.route.snapshot.paramMap.get('id');
    this.sitterofferId = Number(id);

    this.getSitter(this.sitterofferId);

  }

  ngOnInit(): void {
  }

  async getSitter(id: number) {
    this.sitterOfferservice.getOfferById(id).subscribe((data: SitterOffer | undefined) => {
      this.sitterOffer = data;
      console.log(this.sitterOffer);
    });
  }

  navigateToUserProfile() {
    this.router.navigate(['user-profile', this.sitterOffer?.userId])
  }
}
