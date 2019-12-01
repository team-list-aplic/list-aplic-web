import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoicesQuestionComponent } from './multiple-choices-question.component';

describe('MultipleChoicesQuestionComponent', () => {
  let component: MultipleChoicesQuestionComponent;
  let fixture: ComponentFixture<MultipleChoicesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleChoicesQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoicesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
