import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router'; 
import { TranslateModule } from '@ngx-translate/core';  

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, TranslateModule] 
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  // Inyecta Router en el constructor
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  // Remover un libro del carrito
  removeFromCart(bookId: number) {
    this.cartService.removeFromCart(bookId);
  }

  // Limpiar todo el carrito
  clearCart() {
    this.cartService.clearCart();
  }

  // Método para redirigir a la página de pago
  goToPayment(): void {
    this.router.navigate(['/payment']);  // Redirige usando el servicio Router
  }

  // Calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.book.precio, 0);
  }
}
