import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsApi = 'http://localhost:3001/transactions';

  transactions: Transaction[] = [];


  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? "msg-error" : "msg-success",
    });
  }

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
}
