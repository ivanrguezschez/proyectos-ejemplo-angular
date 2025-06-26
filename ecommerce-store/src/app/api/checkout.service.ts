import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class CheckoutService {
    onProceedToPay(): any {
        // Se conectara a stripe para realizar el pago del carrito
    }
}