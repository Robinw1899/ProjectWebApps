import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';
import { Component, OnInit,Input } from '@angular/core';
import { Comment } from '../../models/Comment';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  constructor(private data:DataService,private router:Router) { }

  ngOnInit() {

  }
  onUsernameClick(){
    this.data.selectedUser = this.comment.username;
    this.router.navigate(['/viewprofile']);
  }
}
