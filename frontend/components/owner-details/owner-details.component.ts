import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Owner } from '../../src/models/user-model';
import { getFirestore, collection, where, getDocs , query} from '@angular/fire/firestore';

export interface OwnerInfo{
  adress: string;
  price: number;
  typeOfPets: string;//????
  description: string;
}

@Component({
  selector: 'owner-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule,
    MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css'
})
export class OwnerDetailsComponent {

  owner: Owner | undefined;
  ownerEmail: String | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.ownerEmail = this.route.snapshot.paramMap.get('ownerEmail') + '@' + this.route.snapshot.paramMap.get('ownerEmailProvider') + '.' + this.route.snapshot.paramMap.get('ownerEmailDomain');
    console.log(this.ownerEmail);
    this.getOwner();
  }

  async getOwner(){
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", this.ownerEmail));
    const querySnapshot = await getDocs(q);
    this.owner = querySnapshot.docs[0].data() as Owner;
    
  }
}
