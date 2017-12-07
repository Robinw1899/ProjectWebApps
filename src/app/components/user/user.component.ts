import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user;
  username: String;
  name: String;
  age: number;
  email: String;
  description: string;
  isEdit: boolean = false;
  userEditForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private _service: TweetListDataService) {
  }

  ngOnInit() {
    this._service.getUser(this.auth.user$.getValue()).subscribe(
      item => {
        this.user = item;
        this.username = this.auth.user$.getValue();
        this.name = this.user.firstName + " " + this.user.lastName;
        this.age = this.getAge(this.user.birthdate);
        this.email = this.user.email;
        this.description = this.user.description;
      },
      error => null,
      () => {
        this.userEditForm = this.fb.group({
          firstName: [this.user.firstName, [ Validators.minLength(4)]],
          lastName: [this.user.lastName, [ Validators.minLength(4)]],
          email: [this.user.email],
          birthDate: [this.user.birthdate],
          description:[this.user.description]
        });
        console.log(this.user);
      }
    );

  };
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

  onEdit() {
    this.isEdit = !this.isEdit;
  };

  onSubmit() {
    let user = new User(
      this.userEditForm.value.firstName,
      this.userEditForm.value.lastName,
      this.userEditForm.value.username,
      this.userEditForm.value.email,
      this.userEditForm.value.birthDate,
      this.userEditForm.value.description);
    this._service.updateUser(user, this.auth.user$.getValue()).subscribe(val => {
      if (val) {
        this.onEdit();
      }
    });
  }
}
