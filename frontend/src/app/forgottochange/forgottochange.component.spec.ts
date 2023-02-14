import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottochangeComponent } from './forgottochange.component';

describe('ForgottochangeComponent', () => {
  let component: ForgottochangeComponent;
  let fixture: ComponentFixture<ForgottochangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgottochangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottochangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
