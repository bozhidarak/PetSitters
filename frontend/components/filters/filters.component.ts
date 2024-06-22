import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() isSitterOffer: boolean = false;
  @Output() filters = new EventEmitter<{pets: string[], startDate: string | null, endDate: string | null}>

  filterForm: FormGroup = this.formBuilder.group({
    startDate: [null],
    endDate: [null],
  });
  pets: string[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

  addPetToFilters(pet: string) {
    if (!this.pets.includes(pet)) {
      this.pets.push(pet);
    } else {
      this.pets = this.pets.filter(pt => pt !== pet)
    }
  }

  onFilterBtnPressed() {
    let startDateFormated = null;
    if(this.filterForm.value.startDate) {
      startDateFormated = this.formatDateToString(this.filterForm.value.startDate);
    }
    let endDateFormated = null;
    if(this.filterForm.value.endDate) {
      endDateFormated = this.formatDateToString(this.filterForm.value.endDate);
    }

    this.filters.emit({
      pets: this.pets,
      startDate: startDateFormated,
      endDate: endDateFormated
    });
  }

  formatDateToString(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
