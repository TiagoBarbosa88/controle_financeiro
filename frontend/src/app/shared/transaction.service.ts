import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionsApi = 'http://localhost:3001/transactions';
  categoryApi =  'http://localhost:3001/categories';

  transactions: Transaction[] = [];

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.transactionsApi); 
  }

  
}
