import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'product-list', 
        loadComponent: () => import('./features/products/product-list/product-list.component'),
    },
    { 
        path: 'product-detail/:id', 
        loadComponent: () => import('./features/products/product-detail/product-detail.component'),
    },
    { 
        path: 'checkout', 
        loadComponent: () => import('./features/checkout/checkout.component'),
    },
    { path: '', redirectTo: 'product-list', pathMatch: 'full' },
    { path: '**', redirectTo: 'product-list', pathMatch: 'full' }, // 400
];
