import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Item, Order } from 'src/model/order';
import { Customer } from 'src/model/customer';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';
import { BarcodeFormat } from '@zxing/library';
import { Product } from 'src/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private orderServ: OrderService, private customerServ: CustomerService, private porductServ: ProductService) { }

  selectedItem?: Item
  cartItems: Item[] = []
  quantity: number = 0
  isOpenUpdateDialog: boolean = false;
  isOpenAddDialog: boolean = false;
  totalPrice: number = 0;
  customer: Customer = { id: 0, name: '', phone: '' }

  // scanner
  scannedProduct?: Product
  qrResultString: string = ''
  isScanDialog: boolean = false;
  scannerEnabled:boolean = false
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  ngOnInit(): void {
    this.getCartItems();
  }

  refresh() {
    this.getCartItems();
    this.customer = { id: 0, name: '', phone: '' }
  }

  async getCartItems() {
    this.cartItems = await this.orderServ.getCurrentItems()
    let total = 0;
    this.cartItems.forEach(item => {
      total += (item.unitPrice * item.quantity)
    });
    this.totalPrice = total;
  }

  async addOrder() {

    if (this.customer.name != '' && this.customer.phone != '') {
      let c = await this.customerServ.getByPhone(this.customer.phone)
      console.log(c.length);
      
      let response:Customer
      if(c.length == 0) {
        this.customer.phone = this.customer.phone.toString()
        response = await this.customerServ.addCustomer(this.customer);
      } else {
        response = c[0]
      }
      
      let order: Order = {
        id: 0,
        customerId: response.id,
        dateTime: new Date(),
        totalPrice: this.totalPrice,
      }     

      console.log(order);
      
      let orderRes = await this.orderServ.addOrder(order)

      await this.cartItems.forEach((item) => {
        item.orderId = orderRes.id
        this.orderServ.updateOrderItem(item.id, item)
        this.porductServ.updateProductRemain(item.product?.productId!, item.quantity)
        console.log(item.product?.productId!);

      });
      this.cartItems = []
      this.totalPrice = 0
      this.customer = { id: 0, name: '', phone: '' }
      console.log("order saved");

    }
  }

  async addItem() {
    let item: Item = {
      id: 0,
      productId: this.scannedProduct?.id!,
      quantity: this.quantity,
      unitPrice: this.scannedProduct?.unitPrice!
    }

    let responese = await this.orderServ.addOrderItem(item)
    console.log(responese);
    this.getCartItems();
    this.isOpenAddDialog = false;
  }

  async updateItem() {
    let item: Item = {
      id: this.selectedItem?.id!,
      productId: this.selectedItem?.productId!,
      quantity: this.quantity,
      unitPrice: this.selectedItem?.unitPrice!
    }

    let responese = await this.orderServ.updateOrderItem(this.selectedItem?.id!, item)
    this.getCartItems();
    console.log(responese);
    this.isOpenUpdateDialog = false;
  }

  async removeItem() {
    await this.orderServ.deleteOrderItem(this.selectedItem?.id!)
    this.getCartItems();
    this.isOpenUpdateDialog = false;
  }

  showUpdateDialog() {
    console.log(this.selectedItem);

    this.quantity = this.selectedItem?.quantity!
    this.isOpenUpdateDialog = true;
  }

  plus() {
    this.quantity++
  }

  minus() {
    if (!(this.quantity <= 1)) {
      this.quantity--
    }
  }

  showScanDialog() {
    this.isScanDialog = true
  }


  async onCodeResult(resultString: string) {
    this.scannerEnabled = false;
    this.qrResultString = resultString;
    console.log(resultString);

    let product = await this.porductServ.getProduct(Number(resultString))
    this.showDialog(product);
    this.isScanDialog = false;
  }

  stopScanner() {
    this.scannerEnabled = false;
  }

  startScanner() {
    this.scannerEnabled = true;
  }

  async showDialog(product: Product) {
    this.scannedProduct = product
    this.cartItems = await this.orderServ.getCurrentItems()

    let found = this.cartItems.find((obj) => {
      return obj.productId == this.scannedProduct?.id
    })

    if (found != undefined) {
      this.selectedItem = found
      this.quantity = found.quantity
      this.isOpenUpdateDialog = true
    } else {
      this.quantity = 1
      this.isOpenAddDialog = true
    }
  }

}
