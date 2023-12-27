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

@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule,
     MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {

  hide = true;
  
  registerForm = new FormGroup({
    
    name: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

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
      await addDoc(usersCollection, {
        firstName: this.registerForm.get('name')!.value,
        password: this.registerForm.get('password')!.value,
        email: this.registerForm.get('email')!.value,
      });
      console.log('User added!');
    } catch (error) {
      console.error('Error adding user: ', error);
    }

    // Here you would typically handle the registration logic,
    // such as sending the data to a backend server.
  }
}
