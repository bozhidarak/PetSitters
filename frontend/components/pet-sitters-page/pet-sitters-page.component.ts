import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { PetCardComponent } from '../pet-card/pet-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SitterCardComponent } from '../sitter-card/sitter-card.component';
import { FiltersComponent } from '../filters/filters.component';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'pet-sitters',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, SitterCardComponent, MatGridListModule, FiltersComponent],
  templateUrl: './pet-sitters-page.component.html',
  styleUrl: './pet-sitters-page.component.css'
})
export class PetSittersPageComponent {
  tiles: Tile[] = [
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three',color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four',color: '#DDBDF1'},
    {text: 'Three', color: 'lightpink'},
  ];
}
