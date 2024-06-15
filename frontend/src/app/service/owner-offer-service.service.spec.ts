import { TestBed } from '@angular/core/testing';

import { OwnerOfferService } from './owner-offer-service.service';

describe('OwnerOfferServiceService', () => {
  let service: OwnerOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
