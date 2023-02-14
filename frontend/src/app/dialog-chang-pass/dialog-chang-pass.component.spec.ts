import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangPassComponent } from './dialog-chang-pass.component';

describe('DialogChangPassComponent', () => {
  let component: DialogChangPassComponent;
  let fixture: ComponentFixture<DialogChangPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChangPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
