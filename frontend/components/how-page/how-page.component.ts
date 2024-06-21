import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { Router } from '@angular/router';

@Component({
  selector: 'how-page',
  standalone: true,
  imports: [CommonModule,NavBarComponent,MatButtonModule,MatGridListModule],
  templateUrl: './how-page.component.html',
  styleUrl: './how-page.component.css'
})
export class HowPageComponent {}

