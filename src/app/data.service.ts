import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BaseUrl = 'http://routetask.runasp.net/api';
  constructor(private _HttpClient: HttpClient) { }

  getCustomersData(): Observable<any> {
    return this._HttpClient.get(this.BaseUrl + '/customer')
  }

  getTransactionsData(): Observable<any> {
    return this._HttpClient.get(this.BaseUrl + '/transaction')
  }

  getTransactionsWithCustomerIdData(id: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/customer-transactions/${id}`)
  }

  getCustomerWithId(id: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/customer/${id}`)
  }
}
