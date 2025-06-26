import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '@api/product.service';
import { Product } from '@models/product.interface';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { CartStore } from '@shared/store/shoping-cart.store';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, RatingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export default class ProductDetailComponent implements OnInit {

  private readonly _productService = inject(ProductService);

  productId = input<number>(0, { alias: 'id'});
  product!: Signal<Product | undefined>;
  starArray: number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);

  ngOnInit(): void {
    this.product = this._productService.findById(this.productId());
  }

  onAddToCart(): void {
    this.cartStore.addToCart(this.product() as Product);
  }
}
