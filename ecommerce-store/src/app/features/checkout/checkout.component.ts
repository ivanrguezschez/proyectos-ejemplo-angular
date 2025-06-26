import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@api/checkout.service';
import { CartStore } from '@shared/store/shoping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent {
 
  private readonly _checkoutService = inject(CheckoutService);
  cartStore = inject(CartStore);
  
  onProceedToPay(): void {
    this._checkoutService.onProceedToPay();
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
