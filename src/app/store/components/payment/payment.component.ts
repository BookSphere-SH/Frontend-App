import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item-entity/cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  paymentSuccess: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Procesar el pago
  procesarPago(item: CartItem): void {
    if (this.validarPago(item)) {
      console.log(`Pago procesado para ${item.book.titulo}`);
      this.cartService.marcarComoPagado(item.book.id); // Marcar como pagado
      this.paymentSuccess = true;
      setTimeout(() => {
        this.paymentSuccess = false;
      }, 3000);
    } else {
      console.log('Por favor, completa todos los campos necesarios.');
    }
  }

  validarPago(item: CartItem): boolean {
    if (item.metodoPago === 'credit-card') {
      return !!item.numeroTarjeta && !!item.fechaExpiracion && !!item.codigoSeguridad;
    } else if (item.metodoPago === 'bank-transfer') {
      return true;
    }

    if (item.formato === 'físico') {
      return !!item.direccionEnvio && !!item.ciudadEnvio && !!item.paisEnvio && !!item.codigoPostalEnvio;
    }

    return true;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.book.precio, 0);
  }
}
