import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Customer } from 'src/model/customer';
import { CustomerService } from '../service/customer.service';
import { Item, OrderOutput } from 'src/model/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [ConfirmationService]
})
export class CustomerComponent implements OnInit {
  constructor(private customerServ: CustomerService, private orderServ:OrderService) { }

  isAddDialog:boolean = false;
  isUpdateDialog:boolean = false;
  isOrderDialog:boolean = false;

  customers: Customer[] = []
  newCustomer: Customer = { id: 0, name: '', phone: '' }
  selectedCustomer: Customer = { id: 0, name: '', phone: '' }

  orders: OrderOutput[] = []
  
  selectedOrder?:OrderOutput
  orderItems:Item[] = []

  ngOnInit(): void {
    this.getCustomers();
  }
  refresh() {
    this.getCustomers();
  }
  private async getCustomers() {
    let customers = await this.customerServ.getCustomers()
    this.customers = customers
  }

  async addCustomer() {
    let response = await this.customerServ.addCustomer(this.newCustomer)
    this.getCustomers();
    console.log(response);
    this.newCustomer = { id: 0, name: '', phone: '' }
    this.isAddDialog = false
  }

  async updateCustomer() {
    if (confirm("อัพเดตข้อมูลลูกค้า " + this.selectedCustomer.name + "?")) {
      let response = await this.customerServ.updateCustomer(this.selectedCustomer.id, this.selectedCustomer)
      this.getCustomers();
      console.log(response);
      this.selectedCustomer = { id: 0, name: '', phone: '' }
      this.isUpdateDialog = false
    }
  }

  async deleteCustomer(customer:Customer) {
    if (confirm("ลบข้อมูลลูกค้า " + customer.name + "?")) {
      await this.customerServ.deleteCustomer(customer.id)
      this.getCustomers();
      this.selectedCustomer = { id: 0, name: '', phone: '' }
    }
  }

  async selectCustomer() {
    this.orders = await this.orderServ.getByCustomer(this.selectedCustomer.id)
  }

  async selectOrder() {
    this.orderItems = this.selectedOrder?.items!
    this.isOrderDialog = true
  }

  showAddDialog() {
    this.isAddDialog = true
  }

  showUpdateDialog(customer:Customer) {
    this.selectedCustomer = customer
    this.isUpdateDialog = true
  }

}
