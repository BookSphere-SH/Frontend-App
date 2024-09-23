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

    public maxBooksWithoutPayment = 4;  // Límite de 4 libros antes de solicitar pago adicional
    public additionalPaymentRequired = false;   // Indica si es necesario el pago adicional

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
    const existingItem = currentCart.find(cartItem => cartItem.book.id === item.book.id);

    if (existingItem) {
      existingItem.cantidad++;
      window.alert('Este libro ya está en tu carrito. Se ha incrementado la cantidad.');
    } else {
      currentCart.push(item);
      window.alert('Libro añadido al carrito.');
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
    const cartItems = this.getCartFromLocalStorage();
    const cartItem = cartItems.find(item => item.book.id === book.id);

    return cartItem ? cartItem.book.pagado === true : false;
  }

  // Añadir a la biblioteca si el libro está pagado
  addToLibrary(book: Book): void {
    const libraryBooks = this.getLibraryFromLocalStorage();

    if (this.isBookInLibrary(book)) {
      window.alert('Este libro ya está en tu biblioteca.');
      return;
    }

    if (this.additionalPaymentRequired) {
      window.alert('Debes pagar $5 adicionales para añadir más libros a tu biblioteca.');
      return;
    }

    if (this.isBookPaid(book)) {
      libraryBooks.push(book);
      this.libraryBooksSubject.next(libraryBooks);
      this.saveLibraryToLocalStorage(libraryBooks);

      // Si alcanza el límite de 4 libros, solicitar pago adicional
      if (libraryBooks.length >= this.maxBooksWithoutPayment) {
        this.additionalPaymentRequired = true;
        window.alert('Has añadido 4 libros. Debes pagar $5 para añadir más.');
      }
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

  // Método para verificar si el libro ya está en la biblioteca
  isBookInLibrary(book: Book): boolean {
    const libraryBooks = this.getLibraryBooks();
    return libraryBooks.some(libraryBook => libraryBook.id === book.id);
  }

  // Método para resetear el contador después de pagar los $5 adicionales
  pagarPorMasLibros(): void {
    this.additionalPaymentRequired = false;
    window.alert('Has pagado $5 adicionales. Puedes agregar 4 libros más.');
  }

}
