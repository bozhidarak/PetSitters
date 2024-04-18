import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';


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

  constructor(private router: Router, /*private auth: AngularFireAuth*/) {}

async login() {

  const email = this.email.value!;
  const password = this.password.value!;

  if(!this.email.valid || !this.password.valid){
  return;
  }

    try {
      console.log('User logged in');
    }
    catch (error) {
      console.error('Error logging in: ', error);
    }
  }

  
async singInWithGoogle(){

//   return this.auth.signInWithPopup(new GoogleAuthProvider).then((result) => {
//    this.router.navigate(['home-page']);
//     const user = result.user;
//    }).catch((error) => {
//      // Handle Errors here.
//      const errorCode = error.code;
//      const errorMessage = error.message;
//      // The email of the user's account used.
//      const email = error.customData.email;
//      // The AuthCredential type that was used.
//      const credential = GoogleAuthProvider.credentialFromError(error);
//    });
 }
 

}
