import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeNoDateComponent } from './custome-no-date.component';

describe('CustomeNoDateComponent', () => {
  let component: CustomeNoDateComponent;
  let fixture: ComponentFixture<CustomeNoDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeNoDateComponent]
    });
    fixture = TestBed.createComponent(CustomeNoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
