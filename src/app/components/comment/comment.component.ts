import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import {
  faReply,
  faMinus,
  faPlus,
  faTrash,
  faPencil,
  faTimes,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  constructor(private commentService: CommentService) {}
  faSave = faSave;
  faReply = faReply;
  faTimes = faTimes;
  faMinus = faMinus;
  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencil;
  editmode: boolean = false;
  edited_Comment: string = '';
  message: string = '';
  date_converter: any;

  @Input() showReplyBox: any;
  @Input() replyCommentId: any;
  @Input() single_comment: any;
  @Input() comment: any;
  @Input() console: any;
  @Input() current_user: any;
  @Input() comRep: string;
  @Input() replyToComment: any;
  //output
  @Output() deleteCommentEmit = new EventEmitter();
  @Output() openReplyEmit = new EventEmitter();

  public deleteComment(comment: any, replyToComment: any) {
    // console.log('to delete reply or comment', comment);
    // console.log('to delete main comment', replyToComment);
    const commentsForDeletion = {
      comment: comment,
      replyToComment: replyToComment,
    };

    this.deleteCommentEmit.emit(commentsForDeletion);
  }
  public openReply(parentComment: any, replyToComment: any) {
    this.openReplyEmit.emit({
      parentComment: parentComment,
      replyToComment: replyToComment,
    });
  }
  public tempEditedComment(editedComment: any) {
    this.edited_Comment = editedComment;
    this.message = '';
  }

  public openEdit(comment: any, single_comment: any) {
    setTimeout(() => {
      this.message = '';
    }, 10000);
    this.editmode = !this.editmode;
    if (this.edited_Comment === '' && !this.editmode) {
      this.message = 'Nothing is changed.';
    } else if (!this.editmode) {
      const edited = this.commentService.editCommentService(comment, {
        ...single_comment,
        content: this.edited_Comment,
      });
      if (edited) {
        this.message = 'Edited Successfully!';
      }
    }
  }
  public changeScore(comment: any, upScore: number, replyToComment: any) {
    // this.console.log(comment);
    // this.console.log(replyToComment);
    let temp_score = 0;
    if (replyToComment) {
      if (upScore) {
        temp_score = comment.score + 1;
      } else {
        if (comment.score) {
          temp_score = comment.score - 1;
        }
      }

      this.commentService.changeScoreReply(comment, temp_score, replyToComment);
    } else {
      if (upScore) {
        temp_score = comment.score + 1;
      } else {
        if (comment.score) {
          temp_score = comment.score - 1;
        }
      }
      this.commentService.changeScoreComment(
        comment,
        temp_score,
        replyToComment
      );
    }
  }
}
