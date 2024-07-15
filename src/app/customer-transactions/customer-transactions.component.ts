import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.css']
})
export class CustomerTransactionsComponent {
  customerId!: number;
  transactions: any[] = []
  customerName: any;
  @ViewChild('transactionChart', { static: true }) transactionChart!: ElementRef;
  chart!: Chart;
  constructor(private route: ActivatedRoute, private _DataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.fetchCustomerTransactions();
      this.getCustomerById(this.customerId);

    });
  }
  fetchCustomerTransactions(): void {
    this._DataService.getTransactionsWithCustomerIdData(this.customerId).subscribe((result) => {
      this.transactions = result;
      this.updateChart();
    });
  }

  getCustomerById(id: number): any {
    this._DataService.getCustomerWithId(id).subscribe((result) => {
      this.customerName = result.name;
    })
  }


  updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.transactionChart.nativeElement.getContext('2d');
    const labels = this.transactions.map(transaction => transaction.date);
    const data = this.transactions.map(transaction => transaction.amount);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Transaction Amount',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

