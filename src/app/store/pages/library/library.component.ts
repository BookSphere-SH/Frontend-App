import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../model/book-entity/book.entity';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  imports: [CommonModule]
})
export class LibraryComponent implements OnInit {
  library: Book[] = [];

  constructor(
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getLibraryBooks();
  }

  // Obtener libros de la biblioteca (con localStorage para persistir datos)
  getLibraryBooks(): void {
    const storedLibrary = localStorage.getItem('library');
    if (storedLibrary) {
      this.library = JSON.parse(storedLibrary);  // Cargar desde localStorage si está disponible
    } else {
      this.booksService.getLibraryBooks().subscribe((books: Book[]) => {
        this.library = books;
        this.updateLocalStorage();
      });
    }
  }

  // Actualiza localStorage cuando se añaden o eliminan libros
  updateLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library));
  }

  // Añadir al carrito
  addToCart(book: Book) {
    const cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
    this.showNotification('Libro añadido al carrito');
  }

  // Ver detalles del libro
  goToDetails(bookId: number): void {
    window.location.href = `/books/${bookId}`;
  }

  // Eliminar libro de la biblioteca
  removeFromLibrary(bookId: number): void {
    this.library = this.library.filter(book => book.id !== bookId);
    this.updateLocalStorage();
    this.showNotification('Libro eliminado de la biblioteca');
  }

  // Mostrar notificación personalizada
  showNotification(message: string) {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'custom-notification';
    notificationElement.innerText = message;
    document.body.appendChild(notificationElement);

    setTimeout(() => {
      notificationElement.remove();
    }, 3000);  // Eliminar notificación después de 3 segundos
  }
}
