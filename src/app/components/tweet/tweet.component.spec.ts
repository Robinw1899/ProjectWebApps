import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetComponent } from './tweet.component'
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';

import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';
import {HttpModule, Http, ConnectionBackend} from '@angular/http';
import { AppModule } from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CommentModule } from '../comment/comment.module';
import { AddCommentModule } from '../add-comment/add-comment.module';


describe('TweetComponent', () => {
  let component: TweetComponent;
  //dit is de test inviroment voor deze component , geeft toegang tot de component zelf
  let fixture: ComponentFixture<TweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TweetComponent
      ],
      imports:[
       HttpModule,FormsModule,BrowserModule ,CommentModule,AddCommentModule                
      ],
      providers:[
       ConnectionBackend, DataService,Http,TweetListDataService,AuthenticationService,{provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
