import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faMinus,
  faPlus,
  faTrash,
  faPencil,
  faReply,
} from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';
import { ModalService } from '../modal/modal.service';
declare var window: any;
@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.css'],
})
export class CommentRepliesComponent {
  constructor(
    private modalService: ModalService,
    private commentService: CommentService
  ) {}

  faReply = faReply;
  faMinus = faMinus;
  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencil;
  @Input() single_comment: any;
  @Input() logged_in_user: any;
  @Input() console: any;
  @Input() current_user_details: any;
  showModal: boolean;
  showReplyBox: boolean = false;
  // showReplyBox1: any;
  replyDetails: any;
  confirmModal: any;
  commentToDelete: any;

  ngOnInit() {
    this.showModal = this.modalService.getShowModal();
  }
  // funcitons
  openModal(commentsForDeletion: any) {
    // this.console.log(commentsForDeletion);
    this.commentToDelete = commentsForDeletion;
    this.showModal = this.modalService.openModalService();
  }
  closeModal() {
    this.showModal = this.modalService.closeModalService();
  }
  openReplyBox(commentDetails: any) {
    this.showReplyBox = !this.showReplyBox;
    //replyToComment is for replying
    //parent comment to add reply into
    if (this.showReplyBox) {
      this.replyDetails = {
        ...commentDetails,
        replyingTo:
          'Reply to @' + commentDetails.replyToComment?.user?.username,
      };
      // this.console.log(this.replyDetails.replyToComment.user.username);
    } else {
      this.replyDetails = {};
    }
  }
  showReplyBox1(sho_reply_box: any) {
    this.console.log(sho_reply_box);
    this.showReplyBox = sho_reply_box;
  }
  deleteComment(): boolean {
    // this.console.log(this.commentToDelete);
    const a = this.commentService.deleteCommentService(
      this.commentToDelete.comment,
      this.commentToDelete.replyToComment
    );
    // edit this and make beautiful
    this.console.log(a);
    if (a) {
      this.closeModal();
    }
    return true;
  }
}
