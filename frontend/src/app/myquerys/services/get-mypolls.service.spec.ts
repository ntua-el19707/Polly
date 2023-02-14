import { TestBed } from '@angular/core/testing';

import { GetMypollsService } from './get-mypolls.service';

describe('GetMypollsService', () => {
  let service: GetMypollsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMypollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
