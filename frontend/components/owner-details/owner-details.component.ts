import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterLink } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface OwnerInfo{
  adress: string;
  price: number;
  typeOfPets: string;//????
  description: string;
}

@Component({
  selector: 'owner-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule,
    MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css'
})
export class OwnerDetailsComponent {

  displayedColumns: string[] = ['description', 'value'];
  
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  owners: OwnerInfo[] = [
    {adress: 'Bulevardul Unirii 1', 
    price: 20, 
    typeOfPets: 'dogs',
    description: 'I love dogs',}
  ]
  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/profile-pic.jpg',
    };
    this.slides[1] = {
      src: './assets/profile-pic2.jpg',
    };
    this.slides[2] = {
      src: './assets/woman-holding-dog.jpg',
    };
  }
}
