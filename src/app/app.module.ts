import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { OwnerComponent } from './owner/owner.component';
import { StoreComponent } from './store/store.component';
import { PosComponent } from './pos/pos.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { ReportComponent } from './report/report.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { CartComponent } from './cart/cart.component';
import { QrproductComponent } from './qrproduct/qrproduct.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ThaidatePipe } from './directives/thaidate.pipe'



@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    StoreComponent,
    PosComponent,
    ProductComponent,
    LoginComponent,
    EmployeeComponent,
    CustomerComponent,
    ReportComponent,
    StorefrontComponent,
    CartComponent,
    QrproductComponent,
    ThaidatePipe,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    MenuModule,
    PanelModule,
    MatPaginatorModule,
    QRCodeModule,
    NgxPrintModule,
    TabViewModule,
    DialogModule,
    ImageModule,
    InputTextareaModule,
    ScrollPanelModule,
    InputNumberModule,
    SplitterModule,
    TableModule,
    ConfirmDialogModule,
    ZXingScannerModule,
    TagModule,
    VirtualScrollerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
