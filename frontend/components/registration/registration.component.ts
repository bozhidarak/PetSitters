import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
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
