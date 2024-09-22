import { Component } from '@angular/core';

import {BookCommentsDetailsComponent} from '../../components/book-comments-details/book-comments-details.component';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,
  imports: [BookCommentsDetailsComponent]
})
export class BookDetailsComponent  {

}
