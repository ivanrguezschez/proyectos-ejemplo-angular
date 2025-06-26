import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // API de pruebas documentacion: https://fakestoreapi.com
  private baseUrl: string = 'https://fakestoreapi.com/products';

  constructor(private _httpClient: HttpClient) {}

  // Devuelve un observable de productos
  public getAllProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseUrl);
  }

  // Devuelve un observable de producto
  public getProductById(id: number): Observable<Product> {
    return this._httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Devuelve un observable de categorias
  public getAllCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // Devuelve un observable de producto
  public newProduct(product: Product): Observable<Product> {
    return this._httpClient.post<Product>(this.baseUrl, product);
  }

  // Devuelve un observable de producto
  public updateProduct(id: number, product: Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // Devuelve un observable de producto
  public deleteProduct(id: number): Observable<Product> {
    return this._httpClient.delete<Product>(`${this.baseUrl}/${id}`);
  }
}
