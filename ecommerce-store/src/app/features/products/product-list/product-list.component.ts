import { Component, inject } from '@angular/core';
import { ProductService } from '@api/product.service';
import { Product } from '@models/product.interface';
import { CartStore } from '@shared/store/shoping-cart.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export default class ProductListComponent {
  private readonly _productService = inject(ProductService);

  products = this._productService.products;

  cartStore = inject(CartStore);

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
