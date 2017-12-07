import { AuthenticationService } from './authentication.service';
import { User } from '../../models/User';
import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { Tweet } from '../../models/Tweet';
import { Comment } from '../../models/Comment';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class TweetListDataService {
  private _appUrl = '/API';

  constructor(private http:Http,private auth:AuthenticationService) { 
  }
  
  Tweets() : Observable<Tweet[]>{
    return this.http.get(`${this._appUrl}/Tweets/`).map(response =>  response.json().map(item => Tweet.fromJSON(item)));
  }
  //send this tweet object
  /*id:string;
  _message:string;
  _comments: Comment[];
  _likes:number;
  _date:Date;
  _username:string*/


  /* receive this tweet object from DB
    _message:String,
    _comments:[{type: mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    _likes:Number,
    id:Number
    _id:Number -> officiele id
    _date:Date
    _username:string
  */ 
  addTweet(tweet:Tweet):Observable<Tweet>{
    console.log(tweet);
    var url = `${this._appUrl}/Tweet/`;
    return this.http.post(url,tweet).map(res=>res.json()).map(item=> Tweet.fromJSON(item));
  }
  addComment(comment:Comment,tweetID:string):Observable<Comment>{  
    var url = `${this._appUrl}/Comment/${tweetID}`;
    return this.http.post(url,comment).map(res => res.json()).map(item => Comment.fromJSON(item));
  }
  //{headers: new Headers({Authorization:`Bearer ${this.auth.token}`}) }

  getUser(username:string):Observable<User>{
    var url = `${this._appUrl}/users/profile/`+username;
    return this.http.get(url).map(res => res.json()).map(item=> {
      return User.fromJSON(item)
    });
  }

  updateUser(user:User,username:string):Observable<boolean>{
    var url = `${this._appUrl}/users/profile/patch/`+username;
    return this.http.patch(url,user).map(res=>res.json()).map(res => {
      if (res){
        return true
      }else {
        return false
      }
    });
  }

  /*likeTweet(tweet:Tweet):Observvable<Tweet>{
    var url = `${this._appUrl}/Tweet/like/` +tweet.id;
    return this.http.patch(url,tweet).map(res=>res.json()).map(item => new )
  }*/

  /*dislikeTweet(tweet:Tweet):Observvable<Tweet>{
    var url = `${this._appUrl}/Tweet/dislike/` +tweet.id;
    return this.http.patch(url,tweet).map(res=>res.json()).map(item => new )
  }*/





 
  



 
/*
  getComments(){
    return this.comments;
  }  

  addComment(comment:Comment){
    this.comments.push(comment);
  }*/

  /*getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .map(res =>res.json(),10);
  }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
    .map(res =>res.json(),5);
  }*/

  
}
