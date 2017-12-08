import { Comment } from '../models/Comment';
export class Tweet {
    id: string;
    _message: string;
    _username: string;
    _comments: Comment[];
    _likes: number;
    _date: Date;
    //je moet id nog linken aan elkaar met db, DB gebruikt _id en die moet gelijk zijn aan id
    constructor(message: string, username: string, date: Date, comments?: Comment[], likes?: number, id?: string, ) {
        this._message = message;
        this._comments = comments || new Array<Comment>();
        this._likes = likes || 0;
        this.id = id || '';
        this._username = username;
        this._date = date;
    }
    get message(): string {
        return this._message;
    }

    set message(m: string) {
        this._message = m;
    }

    get comments(): Comment[] {
        return this._comments;
    }
    set comments(comments:Comment[]){
        this.comments = comments;
    }

    set date(date:Date){
        this._date = date;
    }

    get date(): Date{
        return this._date;
    }
    get username():string{
        return this._username;
    }
    set username(us:string){
        this._username = us;
    }
    set likes(likes:number){
        this._likes = likes;
    }
    get likes():number{
        return this._likes;
    }  
/**   message:String,
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    likes:Number,
    username:String,
    date:Date,
    id:Number */
    static fromJSON(json):Tweet{
        const tw = new Tweet(json.message,json.username,json.date,json.comments,json.likes,json._id);
        return tw;
    }


    toJSON() {
        return {
            message: this._message,
            comments:this._comments,
            likes:this._likes,
            username:this._username,
            date: this._date,        
            id: this.id  
        };
    }
}