import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOffersPageComponent } from './owner-offers-page.component';

describe('OwnersPageComponent', () => {
  let component: OwnerOffersPageComponent;
  let fixture: ComponentFixture<OwnerOffersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerOffersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerOffersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
