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
  transactions: Transaction[] = []

  // evento de mudança de transações filtradas para a LISTA
  private monthYearChangeSource = new Subject<{ month: number, year: number }>();
  monthYearChange$ = this.monthYearChangeSource.asObservable();

  emitMonthYearChange(month: number, year: number): void {
    this.monthYearChangeSource.next({ month, year })
  }

  // evento de mudança de transações filtradas para o BALANCE
  private filteredTransactionsSource = new Subject<Transaction[]>();
  filteredTransactions$ = this.filteredTransactionsSource.asObservable();

  emitFilteredTransactions(transactions: Transaction[]): void {
  this.filteredTransactionsSource.next(transactions);
  }

  constructor( private http: HttpClient){}

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.transactionsApi);
  }

  filterTransactions(transactions: Transaction[], month: number, year: number): Transaction[]{
    const filtered = transactions.filter( transaction  => {
      const transactionDate = moment(transaction.date);
      return transactionDate.month() === month && transactionDate.year() === year;
    })
    return filtered;    
  }

  calculateTotals(transactions: Transaction[]):{entrada: number, saida: number, saldo: number}{
    const entrada = transactions.filter(t => t.type === 'receita').reduce((acc, t) => acc + t.value, 0)
    const saida = transactions.filter(t => t.type === 'despesa').reduce((acc, t) => acc + t.value, 0)
    const saldo = entrada - saida
    return { entrada, saida, saldo };
  }
}

