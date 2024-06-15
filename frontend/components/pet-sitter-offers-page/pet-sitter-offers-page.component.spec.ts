import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSittersPageComponent } from './pet-sitter-offers-page.component';

describe('PetSittersPageComponent', () => {
  let component: PetSittersPageComponent;
  let fixture: ComponentFixture<PetSittersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSittersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSittersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
