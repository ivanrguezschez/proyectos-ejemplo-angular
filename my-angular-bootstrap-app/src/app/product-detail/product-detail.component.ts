import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ApiService } from '../services/api.service';
//import { Product, productsList } from '../products/products.mock';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  //products: Product[] = productsList;
  //product?: Product;

  product?: Product;
  loading: boolean = true;
  valueColor: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    /*
    setTimeout(() => {
      this._route.params.subscribe((params) => {
        this.product = this.products.find(
          (product) => product.id == params['productId']
        );
        this.loading = false;
        this.valueColor = (this.product?.price as number) > 5 ? 'red' : '';
      });
    }, 1500);
    */
    this._route.params.subscribe((params) => {
      this._apiService.getProductById(params['productId']).subscribe({
        next: (data: Product) => {
          this.product = data;
          this.loading = false;
          this.valueColor = (this.product?.price as number) > 5 ? 'red' : '';
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
        },
      });
    });
  }
}
