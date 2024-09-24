import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Añadir Router
import { BooksService } from '../../services/books.service';
import { Book } from '../../model/book-entity/book.entity';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';  // Importa el TranslateModule

@Component({
  selector: 'app-book-comments-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  templateUrl: './book-comments-details.component.html',
  styleUrl: './book-comments-details.component.css'
})
export class BookCommentsDetailsComponent implements OnInit {
book: Book | undefined;
  formatoSeleccionado: string | undefined;  // Propiedad para almacenar el formato seleccionado
  pagoRealizado: boolean = false;  // Indica si el pago se ha realizado

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router  // Añadir Router para redireccionar
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.booksService.getBookById(+bookId).subscribe((data: Book) => {
        this.book = data;
      });
    }
  }

  seleccionarFormato(formato: string): void {
    this.formatoSeleccionado = formato;  // Almacena el formato seleccionado
  }

  pagar(): void {
    if (this.formatoSeleccionado) {
      // Redirige a la página de pago y pasa el formato seleccionado
      this.router.navigate(['/payment', { id: this.book?.id, formato: this.formatoSeleccionado }]);
    } else {
      console.log('Por favor, selecciona un formato antes de pagar.');
    }
  }
}
