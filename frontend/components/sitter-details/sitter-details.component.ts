import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CarouselModule } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
];

@Component({
  selector: 'sitter-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule, MatTableModule,
     MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './sitter-details.component.html',
  styleUrl: './sitter-details.component.css'
})
export class SitterDetailsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  slides: any[] = new Array(2).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/profile-pic.jpg',
    };
    this.slides[1] = {
      src: './assets/profile-pic2.jpg',
    };
  }
}
