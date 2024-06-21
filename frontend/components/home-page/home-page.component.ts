import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  loggedIn: boolean = !!localStorage.getItem('userId');

  constructor(private router:Router){}

register(){
  this.router.navigate(['registration']);
}
}
