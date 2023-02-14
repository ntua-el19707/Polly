import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPswComponent } from './confirm-psw.component';

describe('ConfirmPswComponent', () => {
  let component: ConfirmPswComponent;
  let fixture: ComponentFixture<ConfirmPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
