import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'how-page',
  standalone: true,
  imports: [CommonModule,NavBarComponent,MatButtonModule,MatGridListModule],
  templateUrl: './how-page.component.html',
  styleUrl: './how-page.component.css'
})
export class HowPageComponent {
  loggedIn: boolean = true;

  constructor(private router:Router){
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

navigateToRegister(){
  this.router.navigate(['registration']);
}

}
