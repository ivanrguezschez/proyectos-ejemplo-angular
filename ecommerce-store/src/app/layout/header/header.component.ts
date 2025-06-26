import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@shared/store/shoping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showCart = signal<boolean>(false);
  cartStore = inject(CartStore);
}
