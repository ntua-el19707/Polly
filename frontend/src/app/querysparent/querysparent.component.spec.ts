import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerysparentComponent } from './querysparent.component';

describe('QuerysparentComponent', () => {
  let component: QuerysparentComponent;
  let fixture: ComponentFixture<QuerysparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerysparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuerysparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
