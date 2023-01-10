import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommentComponent } from './components/comment/comment.component';
import { AllcommentsComponent } from './components/allcomments/allcomments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentRepliesComponent } from './components/comment-replies/comment-replies.component';
import { ModalComponent } from './components/modal/modal.component';
import { DatePipePipe } from './pipe/date-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    AllcommentsComponent,
    AddCommentComponent,
    CommentRepliesComponent,
    ModalComponent,
    DatePipePipe,
  ],
  imports: [BrowserModule, FontAwesomeModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
