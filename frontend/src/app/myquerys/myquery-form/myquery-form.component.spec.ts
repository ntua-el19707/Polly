import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyqueryFormComponent } from './myquery-form.component';

describe('MyqueryFormComponent', () => {
  let component: MyqueryFormComponent;
  let fixture: ComponentFixture<MyqueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyqueryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyqueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
