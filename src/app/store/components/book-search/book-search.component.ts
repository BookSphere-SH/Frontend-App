import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CommonModule } from '@angular/common'; // Agrega CommonModule aquí
import { Book } from '../../model/book-entity/book.entity';  // Ajusta la ruta si es necesario
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  imports: [FormsModule, NgForOf, NgIf, CommonModule]  // Agrega CommonModule aquí
})
export class BookSearchComponent {
  searchTitle: string = '';
  searchCategory: string = '';
  filteredBooks: Book[] = [];
  noResults: boolean = false; // Variable para manejar el mensaje "No se encontró el libro"

  constructor(private booksService: BooksService) {}

  searchBooks() {
    this.booksService.getAllBooks().subscribe((books: Book[]) => {
      // Filtra los libros por título y categoría
      this.filteredBooks = books.filter(book => {
        const matchesTitle = book.titulo.toLowerCase().includes(this.searchTitle.toLowerCase());
const matchesCategory = this.searchCategory === '' ||
      book.categoria.toLowerCase().trim() === this.searchCategory.toLowerCase().trim();
    return matchesTitle && matchesCategory;
      });

      // Si no hay resultados, se muestra el mensaje
  this.noResults = this.filteredBooks.length === 0;
    });
  }
}
