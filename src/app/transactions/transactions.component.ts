import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions: any[] = []
  customers: any[] = []
  afterFilterTransactions: any[] = [];
  filterName: string = '';
  minAmount: number = 100;
  maxAmount: number = 5000;
  constructor(private _DataService: DataService) {
    _DataService.getTransactionsData().subscribe((result) => {
      this.afterFilterTransactions = this.transactions = result;
    }, (error) => { console.error('Error fetching data:', error); })

    _DataService.getCustomersData().subscribe(
      (result) => {
        this.customers = result;
      }, (error) => { console.error('Error fetching data:', error); })
  }

  getCustomerNameById(customerId: number): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  }

  applyFilters(): void {
    let filteredTransactions = this.transactions;

    if (this.filterName !== null) {
      filteredTransactions = filteredTransactions.filter(transaction =>
        this.getCustomerNameById(transaction.customerId).toLowerCase().includes(this.filterName.toLowerCase()));
    }

    if (this.minAmount >= 0) {
      filteredTransactions = filteredTransactions.filter(transaction => (transaction.amount) >= this.minAmount);
    }
    if (this.maxAmount >= 0) {
      filteredTransactions = filteredTransactions.filter(transaction => (transaction.amount) <= this.maxAmount);
    }

    this.afterFilterTransactions = filteredTransactions;
    console.log(filteredTransactions);
  }
}
