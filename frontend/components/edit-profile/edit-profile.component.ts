import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { getAuth } from '@angular/fire/auth';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from '@firebase/storage';

export enum UserType {
  PetOwner = 1,
  PetSitter = 2
}

@Component({
  selector: 'edit-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatRadioModule, MatCheckboxModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  
  hide = true;
  pictureFiles: File[] = [];
  pictureBlobs: string[] = [];
  profilePic: File | null= null;
  profilePicBlob: string = '';
  
  
  editProfileForm = new FormGroup({
    
    name: new FormControl('',[Validators.required]),
    numberOfPets: new FormControl(0, [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    cats: new FormControl(false, [Validators.required]),
    dogs: new FormControl(false, [Validators.required]),
    birds: new FormControl(false, [Validators.required]),
    small: new FormControl(false, [Validators.required]),
    large: new FormControl(false, [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate:new FormControl('', [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    userType: new FormControl(UserType.PetOwner, [Validators.required])
  })
  
  constructor(private router:Router, private auth: AngularFireAuth){}
  
  removePicture(index: number) {
    this.pictureFiles.splice(index, 1);
    this.pictureBlobs.splice(index, 1);
  }

  removeProfilePic() {
    this.profilePic = new File([], '');
    this.profilePicBlob = '';
  }
  
  onFileSelect(event: any) {
    this.pictureFiles = [];
    this.pictureBlobs = [];
    
    
    for (let i = 0; i < event.target.files.length; i++) {
      this.pictureFiles.push(event.target.files[i]);
    }
    
    // Convert the files to blobs
    this.pictureFiles.forEach(file => {
      this.pictureBlobs.push(URL.createObjectURL(file));
    });
  }

  onProfilePicSelect($event: Event) {
    this.profilePic = ($event.target as HTMLInputElement).files![0];
    this.profilePicBlob = URL.createObjectURL(this.profilePic);
  }
  
  async uploadProfilePic() {
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const filePath = `users/${userId}/profilePic/${this.profilePic?.name}`;
    const fileRef = ref(storage, filePath);
    const uploadTaskSnapshot = await uploadBytesResumable(fileRef, this.profilePic!);
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadURL;
  }

  async uploadPictures() {
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const downloadURLs = [];

    for (let i = 0; i < this.pictureFiles.length; i++) {
      const file = this.pictureFiles[i];
      const filePath = `users/${userId}/${file.name}`;
      const fileRef = ref(storage, filePath);
  
      // Upload the file
      const uploadTaskSnapshot = await uploadBytesResumable(fileRef, file);
  
      // Get the download URL
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      downloadURLs.push(downloadURL);
    }
  
    return downloadURLs;
  }
  
  onSubmit() {
    const auth = getAuth();
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    //add all form fields to an object
    const user:any = {
      name: this.editProfileForm.get('name')!.value!,
      location: this.editProfileForm.get('location')!.value!,
      description: this.editProfileForm.get('description')!.value!,
      cats: this.editProfileForm.get('cats')!.value!,
      dogs: this.editProfileForm.get('dogs')!.value!,
      birds: this.editProfileForm.get('birds')!.value!,
      small: this.editProfileForm.get('small')!.value!,
      large: this.editProfileForm.get('large')!.value!,
      userType: this.editProfileForm.get('userType')!.value!,
    }

    
    //add the rest of the fields to the object
    if(user.userType == UserType.PetOwner){
      user.numberOfPets = this.editProfileForm.get('numberOfPets')!.value!;
      user.startDate = this.editProfileForm.get('startDate')!.value!;
      user.endDate = this.editProfileForm.get('endDate')!.value!;
    }
    else if(user.userType == UserType.PetSitter){
      user.age= this.editProfileForm.get('age')!.value!;
      user.price= this.editProfileForm.get('price')!.value!;  
    }
    
    //add pictures to the object
    this.uploadProfilePic().then(profilePicUrl => {
      user.profilePic = profilePicUrl;
      this.uploadPictures().then(downloadURLs => {
        user.pictures = downloadURLs;
      
        const userId = auth.currentUser?.uid;
        if (userId) {
          setDoc(doc(usersCollection, userId), user);
        } else {
          // Handle the case where there is no current user
        }
      });
    });
  }

}

