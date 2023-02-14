import { TestBed } from '@angular/core/testing';

import { MyinfoService } from './myinfo.service';

describe('MyinfoService', () => {
  let service: MyinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
