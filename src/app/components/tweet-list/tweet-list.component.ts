import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';
import { Tweet } from '../../models/Tweet';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
  _tweets:Tweet[];
  constructor(private _service:TweetListDataService) { }

  ngOnInit() {
    this._service.Tweets().subscribe(items =>this._tweets = items);
  }

  addTweet(tweet:Tweet){
    this._service.Tweets().subscribe(items =>this._tweets = items);
    this._tweets.push(tweet);
  }

  get TweetList(): Tweet[]{
    return this._tweets   
  }

}

