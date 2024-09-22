import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';
import { CommonModule, CurrencyPipe } from '@angular/common';  // Importa CommonModule y CurrencyPipe
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,  // Asegúrate de que es standalone si es el caso
  imports: [CommonModule]  // Asegúrate de importar CommonModule
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

  removeFromCart(bookId: number) {
    this.cartService.removeFromCart(bookId);
  }

  clearCart() {
    this.cartService.clearCart();
  }





  // Método para redirigir a la página de pago
  goToPayment(): void {
    this.router.navigate(['/payment']);  // Redirige usando el servicio Router
  }
}
