import { Book } from '../book-entity/book.entity';  // Ajusta la ruta si es necesario

export class CartItem {
  id: number;
  book: Book;

  cantidad: number;
  formato: string;  // Físico o digital
  metodoPago: string;  // Tarjeta de crédito o transferencia bancaria
  numeroTarjeta?: string;
  fechaExpiracion?: string;
  codigoSeguridad?: string;
  direccionEnvio?: string;
  ciudadEnvio?: string;
  paisEnvio?: string;
  codigoPostalEnvio?: string;

  constructor(book: Book, id: number = 0) {
    this.id = id;
    this.book = book;
    this.cantidad = 1;
    this.formato = 'digital';  // Predeterminado
    this.metodoPago = 'credit-card';  // Predeterminado
  }
}
