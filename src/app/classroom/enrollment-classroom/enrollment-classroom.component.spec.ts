import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentClassroomComponent } from './enrollment-classroom.component';

describe('EnrollmentClassroomComponent', () => {
  let component: EnrollmentClassroomComponent;
  let fixture: ComponentFixture<EnrollmentClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
