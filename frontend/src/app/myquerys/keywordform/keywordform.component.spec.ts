import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordformComponent } from './keywordform.component';

describe('KeywordformComponent', () => {
  let component: KeywordformComponent;
  let fixture: ComponentFixture<KeywordformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
