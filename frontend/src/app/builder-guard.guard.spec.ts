import { TestBed } from '@angular/core/testing';

import { BuilderGuardGuard } from './builder-guard.guard';

describe('BuilderGuardGuard', () => {
  let guard: BuilderGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuilderGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
