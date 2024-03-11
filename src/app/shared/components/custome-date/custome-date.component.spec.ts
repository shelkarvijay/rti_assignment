import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDateComponent } from './custome-date.component';

describe('CustomeDateComponent', () => {
  let component: CustomeDateComponent;
  let fixture: ComponentFixture<CustomeDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeDateComponent]
    });
    fixture = TestBed.createComponent(CustomeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
