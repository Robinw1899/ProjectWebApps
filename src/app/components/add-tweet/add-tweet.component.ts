import { AuthGuardService } from '../../services/Tweetlist-service/auth-guard.service';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tweet } from '../../models/Tweet';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {
  @Output() public tweetAdded = new EventEmitter<Tweet>();
  _tweet: Tweet;

  constructor(private fb: FormBuilder, private _service: TweetListDataService, private auth: AuthenticationService) { }

  ngOnInit() {
    this._tweet = new Tweet('', this.auth.user$.getValue(), new Date());
  }

  addTweet() {
    this._tweet.date = new Date();
    this._service.addTweet(this._tweet).subscribe();
    this.tweetAdded.emit(this._tweet);
    this._tweet = new Tweet('', this.auth.user$.getValue(), new Date());
  }

}
