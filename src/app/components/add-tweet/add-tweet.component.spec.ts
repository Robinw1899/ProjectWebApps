import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTweetComponent } from './add-tweet.component';
import { HttpModule, Http } from '@angular/http';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';

describe('AddTweetComponent', () => {
  let component: AddTweetComponent;
  let fixture: ComponentFixture<AddTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTweetComponent ],
      imports:[
        HttpModule,FormsModule             
       ],
       providers:[
        Http,TweetListDataService,AuthenticationService
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
