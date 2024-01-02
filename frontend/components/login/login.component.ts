import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../src/services/user-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService, AngularFireAuth]
})
export class LoginComponent {
  
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService) {}

async login() {

  const email = this.email.value!;
  const password = this.password.value!;

  if(!this.email.valid || !this.password.valid){
  return;
  }

    try {
      // const credential = await this.auth.signInWithEmailAndPassword(email, password);
      // this.userService.setUser(credential.user);
      console.log('User logged in');
    }
    catch (error) {
      console.error('Error logging in: ', error);
    }
  }

}
