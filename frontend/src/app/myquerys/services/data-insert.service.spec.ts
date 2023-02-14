import { TestBed } from '@angular/core/testing';

import { DataInsertService } from './data-insert.service';

describe('DataInsertService', () => {
  let service: DataInsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
