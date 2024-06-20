import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSitterOfferComponent } from './create-sitter-offer.component';

describe('CreateSitterOfferComponent', () => {
  let component: CreateSitterOfferComponent;
  let fixture: ComponentFixture<CreateSitterOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSitterOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSitterOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
