import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { environment } from "@envs/environment.development";
import { Product } from "@models/product.interface";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root'})
export class ProductService {
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiURL;
    private readonly _injector = inject(EnvironmentInjector);

    public products = signal<Product[]>([]);

    constructor() {
        this.findAll();
    }

    public findAll(): void {
        this._http.get<Product[]>(`${this._endpoint}/products?sort=desc`)
            .pipe(
                map((products: Product[]) => products.map((product: Product) => ({ ...product, qty: 1 }))),
                tap((products: Product[]) => this.products.set(products)))
            .subscribe();
    }

    public findById(id: number) {
        return runInInjectionContext(this._injector, () => 
            toSignal<Product>(
                this._http.get<Product>(`${this._endpoint}/products/${id}`)
                    .pipe(map((product: Product) => ({ ...product, qty: 1 })))
            )
        );
    }
}