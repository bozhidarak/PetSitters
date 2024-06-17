import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OwnerOfferService } from "../../src/app/service/owner-offer-service.service";
import { PetOwnerOffer } from "../../src/models/owner-offer-model";
import { Pet } from "../../src/models/sitter-offer-model";
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JsonPipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { NgIf } from "@angular/common";

@Component({
  selector: 'create-owner-offer',
  standalone: true,
  imports: [NgIf, MatCheckboxModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule,
            JsonPipe, FormsModule, ReactiveFormsModule, ReactiveFormsModule,
            MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './create-owner-offer.component.html',
  styleUrl: './create-owner-offer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOwnerOfferComponent {
  ownerOfferForm: FormGroup = this.formBuilder.group({
    description: [''],
    location: [''],
    startDate: Date,
    endDate: Date,
    dogsNum: null,
    catsNum: null,
    birdsNum: null,
    fishNum: null,
    otherNum: null
  });
  pictures: File[] = [] as File[];
  petTypes: string[] = [] as string[];

  constructor(private formBuilder: FormBuilder, private ownerOfferService: OwnerOfferService) {
  }

  handleOfferCreation() {
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
    let petOwnerOffer = new PetOwnerOffer(this.ownerOfferForm.value.description,
                                      this.ownerOfferForm.value.location, this.ownerOfferForm.value.startDate,
                                      this.ownerOfferForm.value.endDate, 2, pets);

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
}
