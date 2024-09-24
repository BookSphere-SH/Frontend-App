import { Routes } from '@angular/router';
import { BookDetailsComponent } from './store/pages/book-details/book-details.component';

import { CartComponent } from './store/pages/cart/cart.component';  // Asegúrate de que la ruta sea correcta
import { BookSearchComponent } from './store/components/book-search/book-search.component';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { StoreBooksComponent } from "./store/pages/store-books/store-books.component";
import { PaymentPageComponent } from './store/pages/payment-page/payment-page.component';
import { AddBookComponent } from './store/components/add-book/add-book.component';
import { LibraryComponent } from './store/pages/library/library.component';  // Nueva ruta de LibraryComponent
import { BookCommentsDetailsComponent } from './store/components/book-comments-details/book-comments-details.component';
export const routes: Routes = [


    { path: 'store', component: StoreBooksComponent },
    { path: 'cart', component: CartComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'payment', component: PaymentPageComponent },
    { path: '', redirectTo: 'store', pathMatch: 'full' },
      { path: 'search', component: BookSearchComponent },

    { path: 'book/:id', component: BookDetailsComponent },
    { path: '**', component: PageNotFoundComponent }];
