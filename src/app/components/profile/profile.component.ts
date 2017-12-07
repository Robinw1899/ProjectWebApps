import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: String;
  name: String;
  age: number;
  email: String;
  description: string;

  constructor(private data:DataService,private _service:TweetListDataService) { }

  ngOnInit() {
    this._service.getUser(this.data.selectedUser).subscribe(item =>{
      this.username = item.username;
      this.name = item.firstName + " " + item.lastName;
      this.age = this.getAge(item.birthdate);
      this.email = item.email;
      this.description = item.description;
    });
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
