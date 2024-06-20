import { TestBed } from '@angular/core/testing';

import { SharingOwnerOfferService } from './sharing-owner-offer.service';

describe('SharingOwnerOfferServiceService', () => {
  let service: SharingOwnerOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingOwnerOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
