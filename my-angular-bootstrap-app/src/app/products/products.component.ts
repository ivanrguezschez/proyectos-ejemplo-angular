import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from '../services/api.service';
//import { Product, productsList } from './products.mock';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //products: Product[] = productsList;

  products: Product[] = [];

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._apiService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
