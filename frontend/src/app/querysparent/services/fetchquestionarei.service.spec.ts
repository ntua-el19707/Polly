import { TestBed } from '@angular/core/testing';

import { FetchquestionareiService } from './fetchquestionarei.service';

describe('FetchquestionareiService', () => {
  let service: FetchquestionareiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchquestionareiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
