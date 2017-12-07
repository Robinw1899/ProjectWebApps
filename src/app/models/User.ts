import { Comment } from '../models/Comment';
export class User{
    id:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    birthdate:Date;
    description:string;
 

    constructor(_firstName:string,_lastName:string,_username:string,_email:string,_birthdate:Date,_id?:string,_description?:string){
        this.firstName=_firstName;
        this.lastName=_lastName;
        this.username = _username;
        this.email = _email;
        this.birthdate = _birthdate;
        this.id = _id || '0';
        this.description = _description || '';
    }
    static fromJSON(json){
        const us = new User(json.firstname,
            json.lastname,
            json.username,
            json.email,
            json.birthdate,
            json._id,
            json.description);
        return us;
    }
    
}