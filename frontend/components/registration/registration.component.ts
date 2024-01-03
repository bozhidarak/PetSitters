import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDoc } from '@angular/fire/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule,
     MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [ AngularFireAuth, GoogleAuthProvider]
})
export class RegistrationComponent {

  hide = true;
  registerForm = new FormGroup({
    
    name: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  constructor(private router:Router, private auth: AngularFireAuth, private provider: GoogleAuthProvider){}

  passwordsMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  async register() {
    if (!this.registerForm.valid || !this.passwordsMatch())
      return;

    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    try {
      const credential = await this.auth.createUserWithEmailAndPassword(this.registerForm.get('email')!.value!, this.registerForm.get('password')!.value!);
      console.log('User registered with UID: ', credential.user?.uid);
    } catch (error) {
      console.error('Error registering user: ', error);
    }
    this.router.navigate(['pet-sitters']);
  }

async singInWithGoogle(){

 return this.auth.signInWithPopup(new GoogleAuthProvider).then((result) => {
  this.router.navigate(['home-page']);
    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result)
    //const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

}
