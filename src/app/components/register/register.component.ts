import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/Tweetlist-service/authentication.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TweetListDataService } from '../../services/Tweetlist-service/tweet-list.service';


function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': 
      { requiredLength: length, actualLength: control.value.length } } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  
  get passwordControl(): FormControl {
    return <FormControl>this.registerForm.get('passwordGroup').get('password');
  }

  constructor(private fb:FormBuilder,private auth:AuthenticationService,private router:Router) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(2)]],
      lastName: ['', [Validators.required,Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)], 
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: comparePasswords }),
      email:['',[Validators.required]],
      birthdate:['',[Validators.required]]
    });
  }


  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): 
      Observable<{ [key: string]: any }> => {
      return this.auth.
        checkUserNameAvailability(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

  onSubmit(){
    console.log(this.registerForm.value.username);
      // register(firstname:string,lastname:string,username: string, password: string,email:string,birthdate:Date)
      this.auth.register(this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.username,
        this.passwordControl.value,
        this.registerForm.value.email,
        this.registerForm.value.birthdate).subscribe(val =>{
        if(val){
          this.router.navigate(['/']);
        }
        });     
  }

  

}
