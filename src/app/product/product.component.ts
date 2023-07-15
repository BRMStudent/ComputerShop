import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductType } from 'src/model/product';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Subscription } from "rxjs";
import { ProductService } from '../service/product.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ConfirmationService]
})

export class ProductComponent implements OnInit {
  constructor(private productServ: ProductService) {
  }
  searchText: string = '';
  selectedType: string = '';
  products: Product[] = [];
  pageSlice: Product[] = [];
  productTypes: ProductType[] = [{ id: 0, name: "ทั้งหมด" }];
  newProductTypes: ProductType[] = []
  subscription?: Subscription;
  pageIndex: number = 0;
  isOpenUpdateDialog = false;
  isOpenAddDialog = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    unitPrice: 0,
    image: '',
    description: '',
    remain: 0,
    productId: 0,
    productTypeId: 0,
  }

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
  }

  refresh() {
    this.getProducts();
    this.getProductTypes();
  }

  async getProductTypes() {
    let types = await this.productServ.getProductTypes();
    this.productTypes.push.apply(this.productTypes, types)
    this.newProductTypes = types
  }

  async getProducts() {
    let products = await this.productServ.getProducts()
    this.pageSlice = products.slice(0, 20)
    this.products = products
    this.pageIndex = 0
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
    this.searchText = ''
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

  async addProduct() {
    this.selectedProduct.productTypeId = Number(this.selectedType);
    let response = await this.productServ.addProduct(this.selectedProduct)
    this.getProducts();
    this.isOpenAddDialog = false
    console.log(response);
  }

  async updateProduct() {
    if (confirm("ต้องการอัพเดตข้อมูลสินค้า " + this.selectedProduct.productId + "?")) {
      let response = await this.productServ.updateProduct(this.selectedProduct.id, this.selectedProduct)
      this.getProducts();
      this.isOpenUpdateDialog = false
      this.searchText = ''
      console.log(response);
    }
  }

  async deleteProduct() {
    if (confirm("ต้องการลบสินค้า " + this.selectedProduct.productId + "?")) {
      await this.productServ.deleteProduct(this.selectedProduct.id)
      this.getProducts();
      this.isOpenUpdateDialog = false
      this.searchText = ''
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

  showUpdateDialog(product: Product) {
    console.log(product);

    this.selectedProduct = product
    this.isOpenUpdateDialog = true
  }

  showAddDialog() {
    this.isOpenAddDialog = true
    this.selectedProduct = {
      id: 0,
      name: '',
      unitPrice: 0,
      image: '',
      description: '',
      remain: 0,
      productId: 0,
      productTypeId: Number(this.selectedType)
    }
  }
}
