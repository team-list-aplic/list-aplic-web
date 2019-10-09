import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateClassroomComponent } from './participate-classroom.component';

describe('ParticipateClassroomComponent', () => {
  let component: ParticipateClassroomComponent;
  let fixture: ComponentFixture<ParticipateClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipateClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
