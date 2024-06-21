import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SitterOfferService } from '../../src/app/service/sitter-offer.service';
import { Pet, SitterOffer } from '../../src/models/sitter-offer-model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { JsonPipe, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'create-sitter-offer',
  standalone: true,
  imports: [NavBarComponent, NgIf, MatCheckboxModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule,
    JsonPipe, FormsModule, ReactiveFormsModule, MatDividerModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './create-sitter-offer.component.html',
  styleUrl: './create-sitter-offer.component.css'
})
export class CreateSitterOfferComponent {
  sitterOfferForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
    pricePerDay: [null, Validators.required],
    availableFrom: [Date, Validators.required],
    availableUntil: [Date, Validators.required],
  });
  pictures: File[] = [] as File[];
  petTypes: string[] = [] as string[];
  isSubmitPressed: boolean = false;

  constructor(private formBuilder: FormBuilder, private sitterOfferService: SitterOfferService, private router:Router) {
  }

  handleOfferCreation() {
    this.isSubmitPressed = true;
    if(this.petTypes.length === 0) { return }
    const pets= this.createPets();
    const userId = Number(localStorage.getItem("userId"));
    let petSitterOffer = new SitterOffer(this.sitterOfferForm.value.description,
                                                        this.sitterOfferForm.value.pricePerDay,
                                                        this.sitterOfferForm.value.availableFrom, this.sitterOfferForm.value.availableUntil, userId, pets);

    this.sitterOfferService.createOffer(petSitterOffer, this.pictures).subscribe();
    this.router.navigate(['user-profile', userId]);
  }

  onFileChange(event: any) {
    this.pictures = event.target.files;
  }

  onPetTypeSelect(petType: string) {
    if (!this.petTypes.includes(petType)) {
      this.petTypes.push(petType);
    } else {
      this.petTypes = this.petTypes.filter(pt => pt !== petType) //??
    }
  }

  createPets() {
    let pets: Pet[] = [];
    for (let petType of this.petTypes) {
      let pet: Pet = {} as Pet;
      pet.petType = petType;
      pet.numberOfPets = 1;
      pets.push(pet);
    }
    return pets;
  }
}
