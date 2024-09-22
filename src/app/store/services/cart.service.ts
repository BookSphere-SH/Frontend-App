import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../model/cart-item-entity/cart-item.entity';
import { Book } from '../model/book-entity/book.entity';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  private libraryBooks: Book[] = [];
  private libraryBooksSubject = new BehaviorSubject<Book[]>(this.getLibraryFromLocalStorage());
  libraryBooks$ = this.libraryBooksSubject.asObservable();

  constructor() {}

  private getCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Guardar la biblioteca en localStorage
  private saveLibraryToLocalStorage(library: Book[]): void {
    localStorage.setItem('library', JSON.stringify(library));
  }

  private getLibraryFromLocalStorage(): Book[] {
    const library = localStorage.getItem('library');
    return library ? JSON.parse(library) : [];
  }

  addToCart(item: CartItem): void {
    const currentCart = this.cartItemsSubject.value;
    const itemExistente = currentCart.find(cartItem => cartItem.book.id === item.book.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      currentCart.push(item);
    }

    this.cartItemsSubject.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  removeFromCart(bookId: number): void {
    const currentCart = this.cartItemsSubject.value.filter(item => item.book.id !== bookId);
    this.cartItemsSubject.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  // Marcar libro como pagado y guardar en localStorage
  marcarComoPagado(bookId: number): void {
    const cartItems = this.cartItemsSubject.value;
    const item = cartItems.find(cartItem => cartItem.book.id === bookId);
    if (item) {
      item.book.pagado = true;
      this.saveCartToLocalStorage(cartItems);
    }

    // Actualizar estado de los libros también en la biblioteca
    const allBooks = this.getLibraryFromLocalStorage();
    const bookInLibrary = allBooks.find(book => book.id === bookId);
    if (bookInLibrary) {
      bookInLibrary.pagado = true;
    }
    this.saveLibraryToLocalStorage(allBooks);
  }

  // Verificar si un libro ha sido pagado
  isBookPaid(book: Book): boolean {
    return book.pagado === true;
  }

  // Añadir a la biblioteca solo si está pagado
  addToLibrary(book: Book): void {
    if (this.isBookPaid(book)) {
      this.libraryBooks.push(book);
      this.libraryBooksSubject.next(this.libraryBooks);
      this.saveLibraryToLocalStorage(this.libraryBooks);  // Guardar en localStorage
      console.log('Libro añadido a la biblioteca');
    } else {
      console.log('El libro no ha sido pagado, no se puede añadir a la biblioteca');
    }
  }

  getLibraryBooks(): Book[] {
    return this.libraryBooks;
  }
}
