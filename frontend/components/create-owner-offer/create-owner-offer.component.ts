import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OwnerOfferService } from "../../src/app/service/owner-offer-service.service";
import { PetOwnerOffer } from "../../src/models/owner-offer-model";
import { Pet } from "../../src/models/sitter-offer-model";
import {FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JsonPipe, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'create-owner-offer',
  standalone: true,
  imports: [NavBarComponent, NgIf, MatCheckboxModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule,
            JsonPipe, FormsModule, ReactiveFormsModule, ReactiveFormsModule, MatDividerModule,
            MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './create-owner-offer.component.html',
  styleUrl: './create-owner-offer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOwnerOfferComponent {
  ownerOfferForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
    location: ['', Validators.required],
    startDate: [Date, Validators.required],
    endDate: [Date, Validators.required],
    dogsNum: null,
    catsNum: null,
    birdsNum: null,
    fishNum: null,
    otherNum: null
  });
  pictures: File[] = [] as File[];
  petTypes: string[] = [] as string[];
  isSubmitPressed: boolean = false;

  constructor(private formBuilder: FormBuilder, private ownerOfferService: OwnerOfferService) {
  }

  handleOfferCreation() {
    this.isSubmitPressed = true;
    if(this.petTypes.length === 0 || !this.ownerOfferForm.valid || !this.isPetNumberSet()) {
      return
    }
    const pets= this.createPets();

    const startDate = this.formatDateToString(this.ownerOfferForm.value.startDate);
    const endDate = this.formatDateToString(this.ownerOfferForm.value.endDate)
    let petOwnerOffer = new PetOwnerOffer(this.ownerOfferForm.value.description,
                                                        this.ownerOfferForm.value.location,
                                                        startDate, endDate, 2, pets);

    this.ownerOfferService.createOffer(petOwnerOffer, this.pictures).subscribe();
  }

  onFileChange(event: any) {
    this.pictures = event.target.files;
  }

  onPetTypeSelect(petType: string) {
    if (!this.petTypes.includes(petType)) {
      this.petTypes.push(petType);
    } else {
      this.petTypes = this.petTypes.filter(pt => pt !== petType)
    }
  }

  isPetTypeSelected(petType: string) {
    return this.petTypes.includes(petType);
  }

  formatDateToString(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  isPetNumberSet() {
    return !(!this.ownerOfferForm.value.dogsNum && !this.ownerOfferForm.value.catsNum &&
      !this.ownerOfferForm.value.birdsNum && !this.ownerOfferForm.value.fishNum &&
      !this.ownerOfferForm.value.otherNum);
  }

  createPets() {
    let pets: Pet[] = [];
    for (let petType of this.petTypes) {
      let pet: Pet = {} as Pet;
      pet.petType = petType;
      if(petType === 'DOG') {
        pet.numberOfPets = this.ownerOfferForm.value.dogsNum;
      }
      if(petType === 'CAT') {
        pet.numberOfPets = this.ownerOfferForm.value.catsNum;
      }
      if(petType === 'BIRD') {
        pet.numberOfPets = this.ownerOfferForm.value.birdsNum;
      }
      if(petType === 'FISH') {
        pet.numberOfPets = this.ownerOfferForm.value.fishNum;
      }
      if(petType === 'OTHER') {
        pet.numberOfPets = this.ownerOfferForm.value.otherNum;
      }
      pets.push(pet);
    }
    return pets;
  }
}
