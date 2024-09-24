import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book-entity/book.entity';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  protected apiUrl = `${environment.serverBasePath}`;
  filteredBooks: Book[] = [];  // Aquí almacenamos los libros filtrados

  private library: Book[] = [];  // Arreglo para almacenar la biblioteca

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Obtener un libro por su ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`https://my-json-server.typicode.com/BookSphere-SH/Front-App/book/${id}`);
  }

  // Obtener todos los libros de la biblioteca
  getLibraryBooks(): Observable<Book[]> {
    return of(this.library);  // Devuelve los libros de la biblioteca
  }

  // Añadir un libro a la biblioteca
  addBookToLibrary(book: Book): Observable<Book> {
    this.library.push(book);  // Añadir el libro al arreglo de la biblioteca
    this.saveLibrary();  // Guardar la biblioteca en localStorage
    return of(book);  // Retornar el libro añadido
  }

  // Eliminar un libro de la biblioteca
  removeBookFromLibrary(bookId: number): Observable<Book[]> {
    this.library = this.library.filter(book => book.id !== bookId);  // Filtrar el libro a eliminar
    this.saveLibrary();  // Guardar los cambios en localStorage
    return of(this.library);
  }

  // Guardar la biblioteca en localStorage
  private saveLibrary(): void {
    localStorage.setItem('library', JSON.stringify(this.library));
  }
}
