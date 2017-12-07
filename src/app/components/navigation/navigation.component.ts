import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';
import { Observable } from 'rxjs/Rx';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() currentUser: Observable<string>;
  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
  
  }
  onLogout(){
  this.auth.logout();
  }

}
