import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { Order, Item, OrderOutput } from 'src/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  private endPoints = "https://localhost:7157/api/Orders"
  private itemEndPoints = "https://localhost:7157/api/Orders/items"

  async getOrders() {
    return await firstValueFrom(this.http.get<OrderOutput[]>(this.endPoints))
  }

  async getByCustomer(id:number) {
    return await firstValueFrom(this.http.get<OrderOutput[]>(this.endPoints + "?customerId=" + id))
  }

  async getOrder(id: number) {
    return await firstValueFrom(this.http.get<Order>(this.endPoints + "/" + id))
  }

  async addOrder(order: Order) {
    return await firstValueFrom(this.http.post<Order>(this.endPoints, order));
  }

  async updateOrder(id: number, order: Order) {
    return await firstValueFrom(this.http.put<Order>(this.endPoints + "/" + id, order))
  }

  async deleteOrder(id: number) {
    return await firstValueFrom(this.http.delete(this.endPoints + "/" + id))
  }

  async getOrderItem(id: number) {
    return await firstValueFrom(this.http.get<Item>(this.itemEndPoints + "/" + id))
  }

  async getCurrentItems() {
    return await firstValueFrom(this.http.get<Item[]>(this.itemEndPoints + "/null"))
  }

  async addOrderItem(item: Item) {
    return await firstValueFrom(this.http.post<Item>(this.itemEndPoints, item))
  }

  async updateOrderItem(id: number, item: Item) {
    return await firstValueFrom(this.http.put<Item>(this.itemEndPoints + "/" + id, item))
  }

  async deleteOrderItem(id: number) {
    return await firstValueFrom(this.http.delete(this.itemEndPoints + "/" + id))
  }
}
