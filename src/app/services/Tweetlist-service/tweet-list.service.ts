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
  };
  
  Tweets() : Observable<Tweet[]>{
    return this.http.get(`${this._appUrl}/Tweets/`).map(response =>  response.json().map(item => Tweet.fromJSON(item)));
  };

  addTweet(tweet:Tweet):Observable<Tweet>{
    var url = `${this._appUrl}/Tweet/`;
    return this.http.post(url,tweet,{headers: new Headers({Authorization:`Bearer ${this.auth.token}`}) }).map(res=>res.json()).map(item=> Tweet.fromJSON(item));
  };
  addComment(comment:Comment,tweetID:string):Observable<Comment>{  
    var url = `${this._appUrl}/Comment/${tweetID}`;
    return this.http.post(url,comment,{headers: new Headers({Authorization:`Bearer ${this.auth.token}`}) }).map(res => res.json()).map(item => Comment.fromJSON(item));
  };
  //

  getUser(username:string):Observable<User>{
    var url = `${this._appUrl}/users/profile/${username}`;
    return this.http.get(url).map(res => res.json()).map(item=> {
      return User.fromJSON(item)
    });
  };

  updateUser(user:User,username:string):Observable<boolean>{
    var url = `${this._appUrl}/users/profile/put/${username}`;
    return this.http.put(url,user).map(res=>res.json()).map(res => res);
  };

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
