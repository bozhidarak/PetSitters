import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../src/app/service/user.service';
import { User } from '../../src/models/user-model';


@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatToolbarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  loggedIn: boolean = !!localStorage.getItem('userId');
  userName: string = "";
  picture: string | undefined = "";

  constructor(private router:Router, private userService: UserService){
    this.getUserName();
  }

getUserName(){
    if(localStorage.getItem('userId') != null){
      const userId = localStorage.getItem('userId');
      if (userId !== null) {
        const userIdNumber = parseInt(userId);
        this.userService.getUserById(userIdNumber).subscribe(
        (data: User | undefined) => {
          this.userName = data!.name;
          this.picture = data!.profilePic;
        });
      }
    }

  }

  NavigateToSitters(){
    this.router.navigate(['pet-sitters'])
  }

  NavigateToOwners(){
    this.router.navigate(['owners-page'])
  }

  NavigateToRegistration(){
    this.router.navigate(['registration'])
  }

  NavigateToLogin(){
    this.router.navigate(['login'])
  }

  NavigateToHowPage(){
    this.router.navigate(['how-page'])
  }

  NavigateToUserProfile(){
    this.router.navigate(['user-profile', localStorage.getItem('userId')])
  }
}
