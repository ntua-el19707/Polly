import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquerysComponent } from './myquerys.component';

describe('MyquerysComponent', () => {
  let component: MyquerysComponent;
  let fixture: ComponentFixture<MyquerysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyquerysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyquerysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
