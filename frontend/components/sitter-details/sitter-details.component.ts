import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CarouselModule } from '@coreui/angular';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Owner, Sitter } from '../../src/models/user-model';
// import { getFirestore, collection, where, getDocs, query } from '@angular/fire/firestore';

@Component({
  selector: 'sitter-details',
  standalone: true,
  imports: [NavBarComponent,RouterLink, CommonModule,
     MatButtonModule, CarouselModule, MatIconModule],
  templateUrl: './sitter-details.component.html',
  styleUrl: './sitter-details.component.css'
})
export class SitterDetailsComponent {

  sitterEmail: String | null = null;
  sitter: Sitter | undefined;

  constructor(private route: ActivatedRoute) { 
    this.sitterEmail = this.route.snapshot.paramMap.get('sitterEmail') + '@' + this.route.snapshot.paramMap.get('sitterEmailProvider') + '.' + this.route.snapshot.paramMap.get('sitterEmailDomain');
    this.getSitter();
  }

  ngOnInit(): void {
  }

  async getSitter(){
    // const db = getFirestore();
    // const usersRef = collection(db, "users");
    // const q = query(usersRef, where("email", "==", this.sitterEmail));
    // const querySnapshot = await getDocs(q);
    // this.sitter = querySnapshot.docs[0].data() as Sitter;
    // console.log(this.sitter.pictures);
  }
}
