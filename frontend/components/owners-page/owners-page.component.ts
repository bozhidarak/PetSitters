import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'owners-page',
  standalone: true,
  imports: [CommonModule,NavBarComponent, PetCardComponent,MatGridListModule,MatButtonModule,FiltersComponent],
  templateUrl: './owners-page.component.html',
  styleUrl: './owners-page.component.css'
})

export class OwnersPageComponent {
  tiles: Tile[] = [
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three',color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four',color: '#DDBDF1'},
    {text: 'Three', color: 'lightpink'},
  ];

  constructor(private router:Router){}
  
  navigateToDetails(){
    this.router.navigate(['owner-details'])
  }
}