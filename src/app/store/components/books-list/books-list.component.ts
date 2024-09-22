import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../model/book-entity/book.entity';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchTitle: string = '';
  searchAuthor: string = '';
  searchCategory: string = '';

  constructor(private bookService: BookService) {}

  searchBooks() {
    this.bookService.filterBooks(this.searchTitle, this.searchAuthor, this.searchCategory);
  }
}
