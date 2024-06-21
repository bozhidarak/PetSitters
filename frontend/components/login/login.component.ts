import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { UserService } from '../../src/app/service/user.service';
import { User } from '../../src/models/user-model';


@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // providers: [AngularFireAuth]
})
export class LoginComponent {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private router: Router, private userService: UserService) {}

async login() {

  const email = this.email.value!;
  const password = this.password.value!;

  if(!this.email.valid || !this.password.valid){
  return;
  }

  this.userService.login(email, password).subscribe((user) => {
    let user1: User = user;
    localStorage.setItem('userId', user1.id!.toString());
    console.log(localStorage.getItem('userId'));
    this.router.navigate(['home-page']);
  });

  }

}
