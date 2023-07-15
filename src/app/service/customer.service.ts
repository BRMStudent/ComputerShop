import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Customer } from 'src/model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }
  private endPoints = "http://202.28.34.197:9202/api/Customers"

  async getCustomers() {
    return await firstValueFrom(this.http.get<Customer[]>(this.endPoints))
  }
  
  async getByPhone(phone:string) {
    return await firstValueFrom(this.http.get<Customer[]>(this.endPoints + "?phone=" + phone))

  }

  async getCustomer(id: number) {
    return await firstValueFrom(this.http.get<Customer[]>(this.endPoints + "/" + id))
  }

  async addCustomer(customer: Customer) {
    return await firstValueFrom(this.http.post<Customer>(this.endPoints, customer))
  }

  async updateCustomer(id: number, customer: Customer) {
    return await firstValueFrom(this.http.put<Customer>(this.endPoints + "/" + id, customer))
  }

  async deleteCustomer(id: number) {
    return await firstValueFrom(this.http.delete(this.endPoints + "/" + id))
  }

}
