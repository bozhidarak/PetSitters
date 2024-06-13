import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { getAuth } from '@angular/fire/auth';
// import { collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { Sitter, UserType } from '../../src/models/user-model';

@Component({
  selector: 'sitter-card',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './sitter-offer-card.component.html',
  styleUrl: './sitter-offer-card.component.css'
})
export class SitterCardComponent {
  
  @Input() sitter: Sitter | undefined;
  
  constructor() {
    
    }

}
