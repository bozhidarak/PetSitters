import {Component, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'filters',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, NgIf],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})

export class FiltersComponent {
  filterForm: FormGroup = this.formBuilder.group({
    startDate: [Date],
    endDate: [Date],
  });
  pets: string[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

  addPetToFilters(pet: string) {
    this.pets.push(pet);
  }
}
