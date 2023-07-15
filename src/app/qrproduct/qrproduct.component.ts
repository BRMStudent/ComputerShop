import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import arrayShuffle from 'array-shuffle';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-qrproduct',
  templateUrl: './qrproduct.component.html',
  styleUrls: ['./qrproduct.component.scss']
})
export class QrproductComponent implements OnInit {
  constructor(private http: HttpClient) { }
  pageSlice: Product[] = [];
  products: Product[] = [];
  visible:boolean = false;
  selectedProduct?:Product
  qrdata = '';
  ngOnInit(): void {

    this.http.get('http://202.28.34.197:9202/api/Products').subscribe(data => {
      this.products = arrayShuffle(<Product[]>data)
      console.log(this.products);
      
      this.pageSlice = this.products.slice(0, 20)
    });

  }

  genQrCodeDialog(product:Product) {
    this.qrdata = product.id.toString()
    this.selectedProduct = product
    this.visible = true
  }

  onPageChanged(event: PageEvent) {
    let pageIndex = event.pageIndex
    const startIndex = pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if (endIndex > this.products.length) {
      endIndex = this.products.length
    }
    this.pageSlice = this.products.slice(startIndex, endIndex);
  }

}
