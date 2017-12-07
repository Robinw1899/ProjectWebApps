import { Subcomment } from '../models/Subcomment';
export class Comment {
    private _message: string;
    private _subComment: Subcomment[];
    private _likes: number;
    private _username: string;
    private _date: Date;
    private id: string;
    constructor(message: string, username: string, date: Date, subComment?: Subcomment[], likes?: number, id?: string) {
        this._message = message;
        this._subComment = subComment || new Array<Subcomment>();
        this._likes = likes || 0;
        this._username = username;
        this._date = date;
        this.id = id || '';
    }
    set message(message: string) {
        this._message = message;
    }
    get message(): string {
        return this._message;
    }

    set date(date: Date) {
        this._date = date;
    }
    get date(): Date {
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
    set subComment(subComment:Subcomment[]){
        this._subComment = subComment;
    }
    get subComment():Subcomment[]{
        return this._subComment;
    }

/*
     message:String,
    likes:Number,
    subComment:[{type:mongoose.Schema.Types.ObjectId,ref:"Subcomment"}],
    username:String,
    date:Date,*/ 
    static fromJSON(json):Comment{
        const com = new Comment(json.message,
            json.username,
            json.date,
            json.subComment,
            json.likes,
            json._id);
        return com;
    }

    toJSON() {
        return {
            id: this.id,
            message: this._message,
            likes:this._likes,
            subComment:this._subComment,
            username:this._username,
            date: this._date
        };
    }

}