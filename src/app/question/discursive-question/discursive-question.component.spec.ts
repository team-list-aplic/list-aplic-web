import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscursiveQuestionComponent } from './discursive-question.component';

describe('DiscursiveQuestionComponent', () => {
  let component: DiscursiveQuestionComponent;
  let fixture: ComponentFixture<DiscursiveQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscursiveQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscursiveQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
