import { Injectable } from '@angular/core';
import comment_data from 'src/data/data.json';
import { User } from '../models/user';
import { Comment } from '../models/comment';
const commentsInLocal = 'commentsInLocal';
const currentUser = 'currentUser';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comments_data: any = [];
  private comments: Comment[];
  private current_user: User;

  constructor() {
    const s_comments = localStorage.getItem(commentsInLocal);
    this.comments =
      s_comments !== null ? JSON.parse(s_comments) : comment_data.comments;
    const s_user = localStorage.getItem(currentUser);
    this.current_user =
      s_user != null ? JSON.parse(s_user) : comment_data.currentUser;
    // console.log(this.comments);
    // console.log(this.current_user);
  }

  getComments() {
    return this.comments;
  }
  getCurrentUser() {
    return this.current_user;
  }
  addCommentService(newComment: any, parentComment: any) {
    //add new comment
    // console.log(newComment);
    // console.log(parentComment);
    if (parentComment) {
      //add reply to parent component
      let foundIndex = this.findCommentIndex(this.comments, parentComment);
      parentComment.replies.push(newComment);
      // this.comments[foundIndex] = parentComment.replies.push(newComment);
    } else {
      //add new comment
      this.comments.push(newComment);
    }

    //update  local storage
    return this.updateLocalStorage();
  }
  editCommentService(parentComment: any, comment: any) {
    // console.log(parentComment, comment);
    if (parentComment.id === comment.id) {
      let foundComment = this.findComment(this.comments, parentComment.id);
      let foundIndex = this.findCommentIndex(this.comments, foundComment);
      console.log(foundComment, foundIndex);
      this.comments[foundIndex] = comment;
    } else {
      // console.log('reply edit', comment);
      let foundComment = this.findComment(this.comments, parentComment.id);
      let foundIndex = this.findCommentIndex(this.comments, foundComment);
      let foundReply = this.findComment(foundComment.replies, comment.id);
      let replyIndex = this.findCommentIndex(foundComment.replies, foundReply);
      // console.log(foundComment);
      // console.log(foundReply);
      this.comments[foundIndex].replies[replyIndex] = comment;
    }
    return this.updateLocalStorage();
  }
  deleteCommentService(commentToDelete: any, replyToComment: any) {
    // console.log('comm to delete', commentToDelete);
    // console.log('reply to delete', replyToComment);
    console.log(this.comments);
    if (replyToComment) {
      let foundComment = this.findComment(this.comments, replyToComment.id);
      let foundIndex = this.findCommentIndex(this.comments, foundComment);

      let foundReply = this.findComment(
        foundComment.replies,
        commentToDelete.id
      );
      // let replyIndex = this.findCommentIndex(foundComment.replies, foundReply);

      const remainingReply = foundComment.replies.filter((reply: any) => {
        return reply.id !== foundReply.id;
      });
      this.comments[foundIndex].replies = remainingReply;
      // console.log(this.comments);
    } else {
      this.comments = this.comments.filter((comment: any) => {
        return comment.id !== commentToDelete.id;
      });
      console.log(this.comments);
    }
    location.reload();
    this.updateLocalStorage();

    return this.updateLocalStorage();
  }
  //change score reply +/-
  public changeScoreReply(
    originalReply: any,
    temp_score: number,
    replyToComment: any
  ) {
    let foundComment = this.findComment(this.comments, replyToComment.id);
    let foundIndex = this.findCommentIndex(this.comments, foundComment);
    let foundReply = this.findComment(foundComment.replies, originalReply.id);
    let replyIndex = this.findCommentIndex(foundComment.replies, foundReply);
    let newScoreReply = { ...originalReply, score: temp_score };

    this.comments[foundIndex].replies[replyIndex] = newScoreReply;
    return this.updateLocalStorage();
  }
  //change score of comment +/-
  public changeScoreComment(
    comment: any,
    temp_score: number,
    replyToComment: any
  ) {
    // console.log(comment);
    let omment = this.findComment(this.comments, comment.id);
    let index = this.findCommentIndex(this.comments, omment);

    let newScoreComment = { ...comment, score: temp_score };
    this.comments[index] = newScoreComment;
    return this.updateLocalStorage();
  }

  // update storage after operation
  private updateLocalStorage() {
    // console.log(this.comments);
    this.comments.sort((a, b) => (a.score > b.score ? -1 : 1));
    localStorage.setItem(commentsInLocal, JSON.stringify(this.comments));
    return this.getComments();
  }

  private findCommentIndex(mainComments: any, comment: Comment) {
    return mainComments.indexOf(comment);
  }
  private findComment(mainComments: any, id: number) {
    return mainComments.filter((comment: any) => {
      return comment.id === id;
    })[0];
  }
}
