import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  private transactionsApi = 'http://localhost:3001/transactions';
  transaction: Transaction[] = []

  // evento de mudançã
  private monthYearChangeSource = new Subject<{ month: number, year: number }>();
  monthYearChange$ = this.monthYearChangeSource.asObservable();

  emitMonthYearChange(month: number, year: number): void {
    this.monthYearChangeSource.next({ month, year })
  }

  constructor( private http: HttpClient){}

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.transactionsApi);
  }

  filterTransactions(transactions: Transaction[], month: number, year: number): Transaction[]{
    return transactions.filter(transaction => {
      const transactionDate = moment(transaction.date);
      return transactionDate.month() === month && transactionDate.year() === year;
    })
  }
}

