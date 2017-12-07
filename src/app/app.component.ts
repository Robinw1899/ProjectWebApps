import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { AuthenticationService } from './services/Tweetlist-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private auth:AuthenticationService){

}
get currentUser():Observable<string>{
  return this.auth.user$;
}

}
