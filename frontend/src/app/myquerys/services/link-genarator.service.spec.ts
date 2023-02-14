import { TestBed } from '@angular/core/testing';

import { LinkGenaratorService } from './link-genarator.service';

describe('LinkGenaratorService', () => {
  let service: LinkGenaratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkGenaratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
