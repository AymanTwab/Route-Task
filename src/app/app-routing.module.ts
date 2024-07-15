import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CustomerTransactionsComponent } from './customer-transactions/customer-transactions.component';


const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'customer-transactions/:id', component: CustomerTransactionsComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: '**', redirectTo: '/customers' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
