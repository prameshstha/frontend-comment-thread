import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-allcomments',
  templateUrl: './allcomments.component.html',
  styleUrls: ['./allcomments.component.css'],
})
export class AllcommentsComponent {
  constructor(private commentService: CommentService) {}

  lptopFeatures: any = [];
  all_comment_data: any = [];
  current_user: any = {};
  @Input() console: any;
  ngOnInit() {
    this.all_comment_data = this.commentService.getComments();
    this.current_user = this.commentService.getCurrentUser();
    // console.log(this.all_comment_data, this.current_user);
  }
}
