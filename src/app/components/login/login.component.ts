import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  failed:boolean;
  errorMsg:string;

  constructor(private auth:AuthenticationService,private router:Router,private fb:FormBuilder) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password:['',[Validators.required]]
    });
    this.failed = false;
  }

  onSubmit(){
    console.log("clicked on login");
    this.failed = false;
    this.auth.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(val => {
      if(val){
        this.router.navigate(['/']);
      }else{
        this.failed = true;
      }
    },err => this.errorMsg = err.json().message);
  }

}
