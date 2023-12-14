import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'pet-sitters',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './pet-sitters-page.component.html',
  styleUrl: './pet-sitters-page.component.css'
})
export class PetSittersPageComponent {

}
