import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http'
import { SuiModule } from 'ng2-semantic-ui';
import { RouterModule,Routes,PreloadAllModules } from '@angular/router';
//mongodb databank
import { MongoDB } from 'mongodb';
import { Mongodbcore } from 'mongodb-core';
import { Mongoose } from 'mongoose';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { DataService } from './services/data.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { TweetListDataService } from './services/Tweetlist-service/tweet-list.service';
import { AuthGuardService } from './services/Tweetlist-service/auth-guard.service';
import { AuthenticationService} from './services/Tweetlist-service/authentication.service';
import { AddTweetComponent } from './components/add-tweet/add-tweet.component';
import { ProfileComponent } from './components/profile/profile.component';

//routes aanmaken
const appRoutes: Routes = [
  {path:'',canActivate:[AuthGuardService],component:TweetListComponent},
  {path:'profile',canActivate:[AuthGuardService],component:UserComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'comment/:id',component:TweetListComponent},
  {path:'Tweet',component:TweetListComponent},
  {path:'profile/:username',canActivate:[AuthGuardService],component:UserComponent},
  {path:'viewprofile',component:ProfileComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavigationComponent,
    TweetListComponent,
    TweetComponent,
    CommentComponent,
    AddCommentComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AddTweetComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SuiModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [TweetListDataService,AuthenticationService,AuthGuardService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
