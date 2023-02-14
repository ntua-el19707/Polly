import { TestBed } from '@angular/core/testing';

import {fetchquestionarie} from './fetchquestionarie.service';

describe('FetchquestionarieService', () => {
  let service: fetchquestionarie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fetchquestionarie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
