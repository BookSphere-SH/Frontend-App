import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Book } from '../../model/book-entity/book.entity';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';
import { TranslateModule } from '@ngx-translate/core';  // Importa el TranslateModule

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule]  // Añadir FormsModule aquí
})
export class LibraryComponent implements OnInit {
  library: Book[] = [];
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  codigoSeguridad: string = '';

  constructor(
    private booksService: BooksService,
    public cartService: CartService
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

  // Eliminar libro de la biblioteca
  removeFromLibrary(bookId: number): void {
    this.library = this.library.filter(book => book.id !== bookId);
    this.updateLocalStorage();
    this.showNotification('Libro eliminado de la biblioteca');
  }

  // Método para procesar el pago de $5
  procesarPago(): void {
    // Aquí puedes añadir la lógica para procesar el pago
    if (this.numeroTarjeta && this.fechaExpiracion && this.codigoSeguridad) {
      this.cartService.pagarPorMasLibros();  // Resetea el contador en el servicio
      this.showNotification('Has pagado $5 y puedes agregar más libros.');
    } else {
      this.showNotification('Por favor, completa todos los datos para procesar el pago.');
    }
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
    goToDetails(bookId: number): void {
       window.location.href = `/book/${bookId}`;
     }
}
