import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { StoreComponent } from './store/store.component';
import { PosComponent } from './pos/pos.component';
import { LoginComponent } from './login/login.component';
import { QrproductComponent } from './qrproduct/qrproduct.component';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: 'owner/:id', component: OwnerComponent },
  { path: "store/:id", component: StoreComponent },
  { path: "pos/:id", component: PosComponent },
  { path: "qrproduct", component: QrproductComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
