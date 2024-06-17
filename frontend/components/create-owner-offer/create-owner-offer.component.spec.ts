import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerOfferComponent } from './create-owner-offer.component';

describe('CreateOwnerOfferComponent', () => {
  let component: CreateOwnerOfferComponent;
  let fixture: ComponentFixture<CreateOwnerOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOwnerOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOwnerOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
