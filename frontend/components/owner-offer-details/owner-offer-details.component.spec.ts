import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOfferDetailsComponent } from './owner-offer-details.component';

describe('OwnerDetailsComponent', () => {
  let component: OwnerOfferDetailsComponent;
  let fixture: ComponentFixture<OwnerOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerOfferDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
