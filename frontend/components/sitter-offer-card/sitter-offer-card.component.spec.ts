import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterCardComponent } from './sitter-offer-card.component';

describe('SitterCardComponent', () => {
  let component: SitterCardComponent;
  let fixture: ComponentFixture<SitterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitterCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
