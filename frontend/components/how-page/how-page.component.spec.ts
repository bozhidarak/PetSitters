import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowPageComponent } from './how-page.component';

describe('HowPageComponent', () => {
  let component: HowPageComponent;
  let fixture: ComponentFixture<HowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
