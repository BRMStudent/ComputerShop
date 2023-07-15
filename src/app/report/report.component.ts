import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Item, Order, OrderOutput } from 'src/model/order';
import { Customer } from 'src/model/customer';
import { CustomerService } from '../service/customer.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ConfirmationService]
})
export class ReportComponent implements OnInit {
  constructor(private orderServ: OrderService, private customerServ: CustomerService) { }

  isCustomerDialog: boolean = false;
  isPrintDialog: boolean = false;
  orders: OrderOutput[] = []
  selectedOrder?: OrderOutput
  orderItems: Item[] = []
  selectedCustomer: Customer = { id: 0, name: '', phone: '' }

  ngOnInit(): void {
    this.getOrders();
  }

  refresh() {
    this.getOrders();
  }

  async getOrders() {
    this.orders = await this.orderServ.getOrders()
  }

  selectOrder() {
    this.orderItems = this.selectedOrder?.items!
  }

  async removeOrder(order: Order) {
    if (confirm("ลบบันทึกการสั่งซื้อที่ " + order.id + "?")) {
      await this.customerServ.deleteCustomer(order.customerId)
      this.getOrders();
      console.log("order " + order.id + "is removed");
    }

  }

  showCustomerDialog(customer: Customer) {
    console.log(customer);

    this.selectedCustomer = customer
    this.isCustomerDialog = true;
  }

  showPrintDialog(order:OrderOutput) {
    console.log(order);
    
    this.selectedOrder = order
    this.orderItems = order.items
    this.isPrintDialog = true;
  }
}
