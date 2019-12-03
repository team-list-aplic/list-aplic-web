import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateQuestionComponent } from './associate-question.component';

describe('AssociateQuestionComponent', () => {
  let component: AssociateQuestionComponent;
  let fixture: ComponentFixture<AssociateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
