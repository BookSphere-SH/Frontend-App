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

  // Validar los campos de pago
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

  // Función para actualizar el precio cuando se cambia el formato
  actualizarPrecio(item: CartItem): number {
    // Si el formato es "físico", añadimos $8 al precio
    if (item.formato === 'físico') {
      return item.book.precio + 8;  // Añadir $8 si es formato físico
    }
    // Si es formato digital, solo devolver el precio original
    return item.book.precio;
  }


  // Calcular el total del carrito con el ajuste de precio por formato físico
  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + this.actualizarPrecio(item);  // Llamar a la función de actualización de precio
    }, 0);
  }



  // Añadir directamente a la biblioteca si el libro es gratuito
  addToLibrary(item: CartItem): void {
    this.cartService.addToLibrary(item.book);
    this.paymentSuccess = true;
    setTimeout(() => {
      this.paymentSuccess = false;
    }, 3000);
  }
}
