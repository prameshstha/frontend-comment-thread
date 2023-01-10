import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent {
  constructor(private commentService: CommentService) {}
  @Input() current_user_details: any;
  @Input() console: any;
  @Input() replyingTo: any;
  @Output() showReplyBoxOut = new EventEmitter<any>();
  // @Output() showReplyBoxOut: boolean;
  // @Output() addCommentEmit = new EventEmitter();
  text_comment: string = '';
  defaultText: string = '';
  newComment = {};
  errorMessage = '';
  tempCommentSave(comment_value: string) {
    this.text_comment = comment_value;
    this.errorMessage = '';
  }

  addComment(replyingTo: any) {
    if (this.text_comment == '') {
      this.errorMessage = 'Comment is required.';
      return;
    } else {
      // check if replying or commenting
      // if commenting parentComment.id and replyToComment.id will be same

      var str = new Date().setSeconds(0, 0);
      var datetime = new Date(str).toISOString();
      const data = {
        id: Date.now() as number,
        content: this.text_comment,
        createdAt: datetime,
        score: 0,
        user: this.current_user_details,
      };
      // console.log('comment added', data);
      if (replyingTo) {
        this.newComment = {
          ...data,
          replyingTo: replyingTo.replyToComment.user.username,
        };
      } else {
        this.newComment = { ...data, replies: [] };
      }
      //after creation of data for commenting or replying, emit button click to add comment
      const commentAdded = this.commentService.addCommentService(
        this.newComment,
        replyingTo?.parentComment
      );

      if (commentAdded) {
        //clear text data
        this.defaultText = '';
        this.showReplyBoxOut.emit(false);
      }
    }
  }
}
