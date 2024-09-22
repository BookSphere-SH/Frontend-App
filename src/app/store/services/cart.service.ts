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

  // Obtener el carrito del localStorage
  private getCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Guardar carrito en localStorage
  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Guardar la biblioteca en localStorage
  private saveLibraryToLocalStorage(library: Book[]): void {
    localStorage.setItem('library', JSON.stringify(library));
  }

  // Obtener la biblioteca del localStorage
  private getLibraryFromLocalStorage(): Book[] {
    const library = localStorage.getItem('library');
    return library ? JSON.parse(library) : [];
  }

  // Añadir libro al carrito
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

  // Marcar libro como pagado y guardar en localStorage
  marcarComoPagado(bookId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const item = currentCart.find(cartItem => cartItem.book.id === bookId);

    if (item) {
      item.book.pagado = true;
      this.saveCartToLocalStorage(currentCart); // Actualizar en localStorage
    }

    // Actualizar también en la biblioteca
    const allBooks = this.getLibraryFromLocalStorage();
    const bookInLibrary = allBooks.find(book => book.id === bookId);

    if (bookInLibrary) {
      bookInLibrary.pagado = true;
      this.saveLibraryToLocalStorage(allBooks);
    }
  }

  // Verificar si un libro ha sido pagado
  isBookPaid(book: Book): boolean {
    // Verificar si el estado del libro pagado está en el localStorage
    const cartItems = this.getCartFromLocalStorage();
    const cartItem = cartItems.find(item => item.book.id === book.id);

    return cartItem ? cartItem.book.pagado === true : false;
  }

  // Añadir a la biblioteca si el libro está pagado
  addToLibrary(book: Book): void {
    if (this.isBookPaid(book)) {
      const libraryBooks = this.getLibraryFromLocalStorage();
      libraryBooks.push(book);
      this.libraryBooksSubject.next(libraryBooks);
      this.saveLibraryToLocalStorage(libraryBooks);
      console.log('Libro añadido a la biblioteca');
    } else {
      console.log('El libro no ha sido pagado, no se puede añadir a la biblioteca');
    }
  }

  // Obtener los libros en la biblioteca
  getLibraryBooks(): Book[] {
    return this.getLibraryFromLocalStorage();
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

}
