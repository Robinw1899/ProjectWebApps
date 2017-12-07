import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tweet } from '../models/Tweet';
import { Comment } from '../models/Comment';

import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
  _selectedUser:string;
  constructor(public http:Http) { 
  
  }
  set selectedUser(user:string){
    this._selectedUser = user;
  }
  get selectedUser():string{
    return this._selectedUser;
  }
}
