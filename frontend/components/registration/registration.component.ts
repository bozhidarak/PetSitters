import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { getFirestore, collection, addDoc } from '@firebase/firestore';
import { Router } from '@angular/router';
import { User } from '../../src/models/new-user-model';
import { UserService } from '../../src/app/service/user.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { getDoc } from '@angular/fire/firestore';
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule,
     MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  // providers: [ AngularFireAuth, GoogleAuthProvider]
})
export class RegistrationComponent {

  hide = true;
  hide1 = true;
  currentStep = 1;
  registerForm = new FormGroup({
    
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),

  })
  profilePic: File = new File([], '');

  constructor(private router:Router, private userService: UserService){}

  passwordsMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  validFirstStep(){
    if(this.registerForm.get('email')?.valid &&
        this.registerForm.get('password')?.valid &&
        this.passwordsMatch()){
      return true;
    }
    return false;
  }

  nextStep(){
    if (this.registerForm.get('email')?.valid &&
        this.registerForm.get('password')?.valid &&
        this.passwordsMatch()) {
      this.currentStep = 2;
    } else {
      alert('Please ensure all fields are filled out correctly.');
    }
  }

  onFileChange(event: any) {
    this.profilePic = event.target.files[0];
  }

  async register() {
    if (!this.registerForm.valid || !this.passwordsMatch())
      return;

    let user = new User(this.registerForm.get('password')!.value!,this.registerForm.get('email')!.value!, this.registerForm.get('location')!.value!, this.registerForm.get('name')!.value!,);
    this.userService.register(user, this.profilePic).subscribe();
    this.router.navigate(['login']);
   }

}
