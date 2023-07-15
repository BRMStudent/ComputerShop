import { Component, OnInit } from '@angular/core';
import { Product, ProductType } from 'src/model/product';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../service/order.service';
import { Item } from 'src/model/order';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {
  constructor(private productServ: ProductService, private orderServ: OrderService) { }

  searchText: string = '';
  selectedType: string = '';
  subscription?: Subscription;
  isOpenAddDialog: boolean = false;
  isOpenUpdateDialog: boolean = false
  products: Product[] = [];
  pageSlice: Product[] = [];
  productTypes: ProductType[] = [{ id: 0, name: "ทั้งหมด" }];
  pageIndex: number = 0;
  quantity: number = 1;
  selectedProduct?: Product
  selectedItem?: Item
  currentItems: Item[] = []

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
  }

  refresh() {
    this.getProducts();
    this.getProductTypes();
    this.searchText = ''; 
  }

  async getProducts() {
    let products = await this.productServ.getProducts()
    this.pageSlice = products.slice(0, 20)
    this.products = products
    this.pageIndex = 0
  }

  async getProductTypes() {
    let types = await this.productServ.getProductTypes();
    this.productTypes.push.apply(this.productTypes, types)

  }

  async getProductsByType() {
    if (this.selectedType != '0') {
      let products = await this.productServ.getProductsByType(this.selectedType);
      this.pageSlice = products.slice(0, 20)
      this.products = products
      this.pageIndex = 0
    } else {
      this.getProducts();
    }
  }

  searchProducts() {
    this.selectedType = ""
    if (this.searchText == '') {
      this.getProducts();
    } else {
      if (this.subscription) { this.subscription.unsubscribe() }
      this.subscription = this.productServ.searchProducts(this.searchText)
        .subscribe((response: any) => {
          console.log(this.searchText);
          this.pageSlice = response.slice(0, 20)
          this.products = response
          this.pageIndex = 0
        })
    }
  }

  async addItem() {
    let item: Item = {
      id: 0,
      productId: this.selectedProduct?.id!,
      quantity: this.quantity,
      unitPrice: this.selectedProduct?.unitPrice!
    }

    let responese = await this.orderServ.addOrderItem(item)
    console.log(responese);
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
    console.log(responese);
    this.isOpenUpdateDialog = false;
  }

  async removeItem() {
    await this.orderServ.deleteOrderItem(this.selectedItem?.id!)
    this.quantity = 1
    this.isOpenUpdateDialog = false;
  }

  plus() {
    this.quantity++
  }

  minus() {
    if (!(this.quantity <= 1)) {
      this.quantity--
    }
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex
    const startIndex = this.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if (endIndex > this.products.length) {
      endIndex = this.products.length
    }
    this.pageSlice = this.products.slice(startIndex, endIndex);
  }

  async showDialog(product: Product) {
    this.selectedProduct = product
    this.currentItems = await this.orderServ.getCurrentItems()

    let found = this.currentItems.find((obj) => {
      return obj.productId == this.selectedProduct?.id
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
