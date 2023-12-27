import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CarouselModule } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export interface SitterInfo{
  adress: string;
  price: number;
  typeOfPets: string;//????
  description: string;
}

const ELEMENT_DATA: SitterInfo[] =[
  {adress: 'Bulevardul Unirii 1', 
  price: 20, 
  typeOfPets: 'dogs',
   description: 'I love dogs',}
]


export interface PeriodicElement {
  name: string;
  position: number;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen',},
//   {position: 2, name: 'Helium', },
//   {position: 3, name: 'Lithium',},
//   {position: 4, name: 'Beryllium',},
//   {position: 5, name: 'Boron', },
// ];

@Component({
  selector: 'sitter-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule, MatTableModule,
     MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './sitter-details.component.html',
  styleUrl: './sitter-details.component.css'
})
export class SitterDetailsComponent {

  displayedColumns: string[] = ['description', 'value'];
  dataSource = ELEMENT_DATA;
  
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

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
