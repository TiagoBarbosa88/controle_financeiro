import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsApi = 'http://localhost:3001/transactions';
  private categoryApi = 'http://localhost:3001/categories';

  transactions: Transaction[] = [];
  categories: Category[] = [];

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

  getCategoryId(categoryName: string): number {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.id : 0;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryApi)
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsApi, transaction);
  }
}
