import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCommentComponent } from './add-comment.component';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';

import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';
import {HttpModule, Http} from '@angular/http';
import { AppModule } from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  //dit is de test inviroment voor deze component , geeft toegang tot de component zelf
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AddCommentComponent
      ],
      imports:[
       HttpModule,FormsModule  ,BrowserModule                 
      ],
      providers:[
        Http,TweetListDataService,AuthenticationService,{provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
