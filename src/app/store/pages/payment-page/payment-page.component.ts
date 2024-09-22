import { Component } from '@angular/core';
import { PaymentComponent } from '../../components/payment/payment.component';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
  standalone: true,
  imports: [PaymentComponent]
})
export class PaymentPageComponent {

}
