import { Component, OnInit,Input } from '@angular/core';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service'
import { Tweet } from '../../models/Tweet';
import { Comment } from '../../models/Comment';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input('tweet') tweet : Tweet;
  comments:Comment[];
  amountOfComments:number;
  currentComment:Comment;

  constructor(public _service:TweetListDataService) { }

  ngOnInit() {
    this.comments = this.tweet._comments;
    this.checkAmountComments();
  }
  addComment(comment:Comment){
    this.comments.push(comment)
    this.checkAmountComments();
  }

  checkAmountComments(){
    this.amountOfComments = this.comments.length;
  }
}
