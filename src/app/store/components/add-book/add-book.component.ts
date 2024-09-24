import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';  
import { Book } from '../../model/book-entity/book.entity';
import { FormsModule } from '@angular/forms';  
import { TranslateService } from '@ngx-translate/core';  
import { TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [FormsModule, TranslateModule]
})
export class AddBookComponent {
  newBook: Book = new Book();  // Crea una instancia de 'Book' para los datos del formulario

  constructor(private booksService: BooksService, private translate: TranslateService) {
    // Opción para cambiar el idioma, puedes configurarlo aquí si lo necesitas
    this.translate.use('en');  // Cambiar el idioma inicial
  }

  onSubmit() {
    this.booksService.addBookToLibrary(this.newBook).subscribe((book) => {
      console.log('Libro añadido a la biblioteca:', book);
    });
  }
}
