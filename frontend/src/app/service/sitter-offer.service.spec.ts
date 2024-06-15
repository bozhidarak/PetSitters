import { TestBed } from '@angular/core/testing';

import { SitterOfferService } from './sitter-offer.service';

describe('SitterOfferService', () => {
  let service: SitterOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitterOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
