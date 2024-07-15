import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any[] = [];
  afterFilterCustomers: any[] = [];
  transactions: any[] = [];
  customerTransactions: any[] = [];
  filterName: string = '';
  minAmount: number = 100;
  maxAmount: number = 5000;

  constructor(private _DataService: DataService) {
    _DataService.getCustomersData().subscribe(
      (result) => {
        this.afterFilterCustomers = this.customers = result;
      },
      (error) => { console.error('Error fetching data:', error); }
    )

    _DataService.getTransactionsData().subscribe((result) => {
      this.transactions = result;
    }, (error) => { console.error('Error fetching data:', error); })
  }

  findCustomerTransactionsAmount(id: number): number {
    let customerTransactions = this.transactions.filter(transaction => transaction.customerId === id);
    return this.calculateTotalAmount(customerTransactions);
  }

  calculateTotalAmount(customerTransactions: any): number {
    return customerTransactions.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
  }

  applyFilters(): void {
    let filteredCustomers = this.customers;

    if (this.filterName !== null) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.name.toLowerCase().includes(this.filterName.toLowerCase()));
    }

    if (this.minAmount >= 0) {
      filteredCustomers = filteredCustomers.filter(customer => this.findCustomerTransactionsAmount(customer.id) >= this.minAmount);
    }
    if (this.maxAmount >= 0) {
      filteredCustomers = filteredCustomers.filter(customer => this.findCustomerTransactionsAmount(customer.id) <= this.maxAmount);
    }

    this.afterFilterCustomers = filteredCustomers;
    console.log(filteredCustomers);
  }

}
