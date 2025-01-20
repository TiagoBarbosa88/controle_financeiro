import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // private transactionsApi = 'http://localhost:3001/transactions';
  private transactionsApi = environment.transactionUrl

  transactions: Transaction[] = [];


  constructor(
    
    private http: HttpClient
  ) { }

 

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsApi);
  }


  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsApi, transaction);
  }

  readTransactionById(id: string): Observable<Transaction>{
    const url = `${this.transactionsApi}/${id}`;
    return this.http.get<Transaction>(url);
  }

  updateTransaction(transaction: Transaction):Observable<Transaction>{
    const url = `${this.transactionsApi}/${transaction.id}`;
    return this.http.put<Transaction>(url, transaction)
  }

  deleteTransaction(id: string): Observable<Transaction>{
    const url = `${this.transactionsApi}/${id}`;
    return this.http.delete<Transaction>(url)
  }
}
