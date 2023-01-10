import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRepliesComponent } from './comment-replies.component';

describe('CommentRepliesComponent', () => {
  let component: CommentRepliesComponent;
  let fixture: ComponentFixture<CommentRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentRepliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
