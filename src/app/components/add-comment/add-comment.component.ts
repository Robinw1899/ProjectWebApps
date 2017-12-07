import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Comment } from '../../models/Comment';
import { Tweet } from '../../models/Tweet';
import {TweetListDataService} from '../../services/Tweetlist-service/tweet-list.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() public tweet:Tweet;
  @Output() public commentAdded = new EventEmitter<Comment>();
  _comment:Comment;

  constructor(public _service:TweetListDataService,public auth:AuthenticationService) { }

  ngOnInit() {
    this._comment = new Comment('',this.auth.user$.getValue(),new Date());
  }

  get comment(){
    return this._comment;
  }

  addComment(){ 
    this._comment.date = new Date();
    this._service.addComment(this._comment,this.tweet.id).subscribe();   
    this.commentAdded.emit(this._comment);
    this._comment = new Comment('',this.auth.user$.getValue(),new Date());
  }

}
