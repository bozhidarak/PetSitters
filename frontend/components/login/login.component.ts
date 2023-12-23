import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  register(formValue: any) {
    console.log('Form Submitted', formValue);
    // Here you would typically handle the registration logic,
    // such as sending the data to a backend server.
  }
  hide = true;
  text = new FormControl('',[Validators.required])
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
}
