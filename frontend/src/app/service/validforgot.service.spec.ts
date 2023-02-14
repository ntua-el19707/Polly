import { TestBed } from '@angular/core/testing';

import { ValidforgotService } from './validforgot.service';

describe('ValidforgotService', () => {
  let service: ValidforgotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidforgotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
