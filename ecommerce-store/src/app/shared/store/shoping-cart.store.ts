import { computed, inject } from "@angular/core";
import { Product } from "@models/product.interface";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
    products: Product[],
    productCount: number,
    totalAmount: number,
}

const inicialState: CartStore = {
    products: [],
    productCount: 0,
    totalAmount: 0,
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(inicialState),
    withComputed(({ products }) => ({
        productCount: computed(() => caculateProductCount(products())), 
        totalAmount: computed(() => caculateTotalAmount(products())),
    })),
    withMethods(({products, ...store}, toastrService = inject(ToastrService)) => ({
        addToCart(product: Product) {
            const isProductInCart = products().find((item: Product) => item.id === product.id);
            if (isProductInCart) {
                isProductInCart.qty++;
                isProductInCart.subtotal = isProductInCart.qty * isProductInCart.price;
                patchState(store, { products: [ ...products() ] });
            } else {
                patchState(store, { products: [ ...products(), product ] });
            }
            toastrService.success('Product added', 'IRS ECOMMERCE STORE');
        },
        removeFromCart(id: number) {
            const productsUpdated = products().filter(product => product.id !== id);
            patchState(store, { products: productsUpdated });
            toastrService.info('Product removed', 'IRS ECOMMERCE STORE');
        },
        clearCart() {
            patchState(store, inicialState);
            toastrService.info('Cart cleared', 'IRS ECOMMERCE STORE');
        },
    })),
);

function caculateProductCount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.qty, 0);
}

function caculateTotalAmount(products: Product[]): number {
    return products.reduce((acc, product) => acc + (product.price * product.qty), 0);
}