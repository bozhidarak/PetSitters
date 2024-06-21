import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SitterOffer } from '../../src/models/sitter-offer-model';
import { Router } from '@angular/router';

@Component({
  selector: 'sitter-card',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './sitter-offer-card.component.html',
  styleUrl: './sitter-offer-card.component.css'
})
export class SitterCardComponent {

  @Input() sitter: SitterOffer = {} as SitterOffer;

  constructor(private router: Router) {

  }

  navigateToUser() {
    this.router.navigate(['user-profile', this.sitter!.userId]);
  }
}
