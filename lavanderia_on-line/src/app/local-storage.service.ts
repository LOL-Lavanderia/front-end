import { Injectable } from '@angular/core';
import { Order } from './shared/models/order';

const ORDERS_KEY = 'orders';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getOrders(): Order[] {
    const ordersString = localStorage.getItem(ORDERS_KEY);
    return ordersString ? JSON.parse(ordersString) : [];
  }

  saveOrders(orders: Order[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}
