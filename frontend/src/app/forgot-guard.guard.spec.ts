import { TestBed } from '@angular/core/testing';

import { ForgotGuardGuard } from './forgot-guard.guard';

describe('ForgotGuardGuard', () => {
  let guard: ForgotGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForgotGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
