import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';  // Asegúrate de que la ruta es correcta
import { Book } from '../../model/book-entity/book.entity';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule si usas [(ngModel)]

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [FormsModule]
})
export class AddBookComponent {
  newBook: Book = new Book();  // Crea una instancia de 'Book' para los datos del formulario

  constructor(private booksService: BooksService) {}

  onSubmit() {
    this.booksService.addBookToLibrary(this.newBook).subscribe((book) => {
      console.log('Libro añadido a la biblioteca:', book);
    });
  }
}
