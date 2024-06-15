import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOfferCardComponent } from './owner-offer-card.component';

describe('OwnerOfferCardComponent', () => {
  let component: OwnerOfferCardComponent;
  let fixture: ComponentFixture<OwnerOfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerOfferCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
