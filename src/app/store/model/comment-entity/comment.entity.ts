export class Comment {
  id: number;
  username: string;
  content: string;
  rating: number;
  date: Date;
  constructor (){
    this.id = 0,
    this.username = '',
    this.content = '',
    this.rating = 0,
    this.date = new Date();


    }
}
