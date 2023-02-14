import { TestBed } from '@angular/core/testing';

import { RequestjwtService } from './requestjwt.service';

describe('RequestjwtService', () => {
  let service: RequestjwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestjwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
