import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../model/book-entity/book.entity';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';
import { TranslateModule } from '@ngx-translate/core';  // Importa el TranslateModule

@Component({
  selector: 'app-store-books',
  standalone: true,
  templateUrl: './store-books.component.html',
  styleUrls: ['./store-books.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule]
})
export class StoreBooksComponent implements OnInit {
  books: Book[] = [];
  filterTitle: string = '';
  searchCategory: string = '';
  noResults: boolean = false;

  // Variables para datos de pago
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  codigoSeguridad: string = '';

  constructor(
    private booksService: BooksService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((data: any) => {
      console.log('Datos recibidos de la API:', data);  // Imprimir los datos para verificar
      if (data.book && Array.isArray(data.book)) {
        this.books = data.book;  // Accede al arreglo de libros en 'data.book'
      } else {
        console.error('Error: La respuesta no contiene un arreglo de libros, es:', data);
        this.books = [];  // Inicializa como un arreglo vacío si no hay libros
      }
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

  addToLibrary(book: Book) {
    this.cartService.addToLibrary(book);
  }

  isBookPaid(book: Book): boolean {
    return this.cartService.isBookPaid(book);
  }

  goToDetails(bookId: number): void {
    window.location.href = `/book/${bookId}`;
  }

  // Método para procesar el pago
  procesarPago(): void {
    if (this.numeroTarjeta && this.fechaExpiracion && this.codigoSeguridad) {
      // Simulación del pago
      window.alert('Pago de $5 realizado con éxito.');

      // Llama al servicio para permitir añadir más libros
      this.cartService.pagarPorMasLibros();
    } else {
      window.alert('Por favor, completa todos los campos de pago.');
    }
  }
}
