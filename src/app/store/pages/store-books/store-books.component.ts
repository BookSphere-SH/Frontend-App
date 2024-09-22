import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../model/book-entity/book.entity';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';

@Component({
  selector: 'app-store-books',
  standalone: true,
  templateUrl: './store-books.component.html',
  styleUrls: ['./store-books.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class StoreBooksComponent implements OnInit {
  books: Book[] = [];
  filterTitle: string = '';
  searchCategory: string = '';
  noResults: boolean = false;

  constructor(
    private booksService: BooksService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.noResults = this.books.length === 0;
    });
  }

  filteredBooks() {
    const filtered = this.books.filter(book => {
      const matchesTitle = book.titulo.toLowerCase().includes(this.filterTitle.toLowerCase());
      const matchesCategory = this.searchCategory === '' || book.categoria.toLowerCase() === this.searchCategory.toLowerCase();
      return matchesTitle && matchesCategory;
    });

    this.noResults = filtered.length === 0;
    return filtered;
  }

  addToCart(book: Book) {
    const cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }

  // Verifica si el libro ha sido pagado antes de añadir a la biblioteca
  addToLibrary(book: Book) {
    this.cartService.addToLibrary(book);
  }

  isBookPaid(book: Book): boolean {
    return this.cartService.isBookPaid(book);
  }

  goToDetails(bookId: number): void {
    window.location.href = `/books/${bookId}`;
  }
}
