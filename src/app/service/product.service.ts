import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product, ProductType } from 'src/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private endPoints = "https://localhost:7157/api/Products"

  async getProducts() {
    return await firstValueFrom(this.http.get<Product[]>(this.endPoints))
  }

  async getProduct(id: number) {
    return await firstValueFrom(this.http.get<Product>(this.endPoints + "/" + id))
  }

  async getProductTypes() {
    return await firstValueFrom(this.http.get<ProductType[]>(this.endPoints + "/types"))
  }

  async getProductsByType(selectedType: string) {
    return await firstValueFrom(this.http.get<Product[]>(this.endPoints + "?typeId=" + selectedType))
  }

  searchProducts(searchText: string) {
    return this.http.get(this.endPoints + "?keyword=" + searchText)
  }

  async addProduct(product: Product) {
    return await firstValueFrom(this.http.post<Product>(this.endPoints, product))
  }

  async updateProduct(id: number, product: Product) {
    return await firstValueFrom(this.http.put<Product>(this.endPoints + "/" + id, product))
  }

  async deleteProduct(id: number) {
    return await firstValueFrom(this.http.delete(this.endPoints + "/" + id))
  }

  async updateProductRemain(productId: number, selled: number) {
    return await firstValueFrom(this.http.put(this.endPoints + "/" + productId + "/remain?selled=" + selled, null))
  }

}
