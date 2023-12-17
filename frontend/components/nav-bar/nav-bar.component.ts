import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { PetSittersPageComponent } from '../pet-sitters-page/pet-sitters-page.component';


@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatToolbarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(private router:Router){

  }

  NavigateToSitters(){
    this.router.navigate(['pet-sitters'])
  }

  NavigateToOwners(){
    this.router.navigate(['owners-page'])
  }
}
