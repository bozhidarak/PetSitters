import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { arrayRemove, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from '@firebase/storage';
import { Owner, Sitter, User, UserType } from '../../src/models/user-model';


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
  existingPictures: string[] = [];
  profilePic: File | null = null;
  profilePicBlob: string | null = null;
  currentUserEmail: string = '';
  currentUser: Owner | Sitter | undefined;
  createAdFlag: boolean = false;
  isSubmitting: boolean = false;
  
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
    userType: new FormControl(UserType.PetOwner, [Validators.required]),
    createAd: new FormControl(false)
  })
  
  constructor(private router:Router){ }

  ngOnInit() {
    const auth = getAuth();
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = auth.currentUser?.uid;
        this.currentUserEmail = auth.currentUser?.email!;
        if (userId) {
          getDoc(doc(usersCollection, userId)).then((doc) => {
          if (doc.exists()) {
            if(doc.data()?.['userType'] == UserType.PetOwner) {
              this.currentUser = doc.data() as Owner;
            } else {
              this.currentUser = doc.data() as Sitter;
            }
            this.setFormValues(this.currentUser)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    } else {
      // Handle the case where there is no current user
    }
  } else {
    
}});
  }

  setFormValues(user: Owner | Sitter) {
    this.editProfileForm.patchValue({
      name: user.name,
      location: user.location,
      description: user.description,
      cats: user.cats,
      dogs: user.dogs,
      birds: user.birds,
      small: user.small,
      large: user.large,
      createAd: user.createAd,
      userType: user.userType,
      numberOfPets: user.userType == UserType.PetOwner ? user.numberOfPets : null,
      startDate: 'startDate' in user && user.userType == UserType.PetOwner ? user.startDate : null,
      endDate: 'endDate' in user && user.userType == UserType.PetOwner ? user.endDate : null,
      age: 'age' in user && user.userType == UserType.PetSitter ? user.age : null,
      price: 'price' in user && user.userType == UserType.PetSitter ? user.price : null
    });
  }

  removePicture(index: number) {
    this.pictureFiles.splice(index, 1);
    this.pictureBlobs.splice(index, 1);
  }

  async removeExistingPicture(index: number) {
    const selectedPicture = this.currentUser?.pictures[index];

    const db = getFirestore();
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    
    const storage = getStorage();
    const storageRef = ref(storage, selectedPicture);
    
    // Delete the file from Firebase Storage
    await deleteObject(storageRef);
  
    // Update the user's pictures array in Firestore
    const userRef = doc(db!, 'users', uid!);
    await updateDoc(userRef, { pictures: arrayRemove(selectedPicture) });

    this.currentUser?.pictures.splice(index, 1);
  }

  removeProfilePic() {
    this.profilePic = new File([], '');
    this.profilePicBlob = '';
  }
  
  onFileSelect(event: any) {
   
    for (let i = 0; i < event.target.files.length; i++) {
      this.pictureFiles.push(event.target.files[i]);
      this.pictureBlobs.push(URL.createObjectURL(event.target.files[i]));
    }
  }

  onProfilePicSelect($event: Event) {
    this.profilePic = ($event.target as HTMLInputElement).files![0];
    this.profilePicBlob = URL.createObjectURL(this.profilePic);
  }
  
  async uploadProfilePic() {
    const storage = getStorage();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if(this.profilePic != null){
      const filePath = `users/${userId}/profilePic/${this.profilePic?.name}`;
      const fileRef = ref(storage, filePath);
      const uploadTaskSnapshot = await uploadBytesResumable(fileRef, this.profilePic!);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      return downloadURL;
    }

    return null;
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
  
  onSubmit() { //TODO: create AD
    this.isSubmitting = true;
    const auth = getAuth();
    const db = getFirestore();
    const usersCollection = collection(db, 'users');

    //add all form fields to an object
    const user: any = {
      name: this.editProfileForm.get('name')!.value!,
      email: this.currentUserEmail,
      location: this.editProfileForm.get('location')!.value!,
      description: this.editProfileForm.get('description')!.value!,
      cats: this.editProfileForm.get('cats')!.value!,
      dogs: this.editProfileForm.get('dogs')!.value!,
      birds: this.editProfileForm.get('birds')!.value!,
      small: this.editProfileForm.get('small')!.value!,
      large: this.editProfileForm.get('large')!.value!,
      userType: this.editProfileForm.get('userType')!.value!,
      createAd: this.editProfileForm.get('createAd')!.value!,
      
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
      if(profilePicUrl != null){
        user.profilePic = profilePicUrl;
      }
      else if(this.currentUser?.profilePic != null){
        user.profilePic = this.currentUser?.profilePic;
      } else {
        user.profilePic = '';
      }
      this.uploadPictures().then(downloadURLs => {
        if(this.currentUser?.pictures != null){
          user.pictures = this.currentUser?.pictures?.concat(downloadURLs);
        } else if(downloadURLs != null){
          user.pictures = downloadURLs;
        } else{
          user.pictures = [];
        }
        const userId = auth.currentUser?.uid;
        if (userId) {
          console.log(user);
          setDoc(doc(usersCollection, userId), user);
          this.isSubmitting = false;
          this.router.navigate(['home-page']);
        } else {
          // Handle the case where there is no current user
        }
      });
    });
  }
 
signOutUser() {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out', error);
  });
  this.router.navigate(['home-page']);
}

navigateToHome(){
  this.router.navigate(['home-page']);
}

}

