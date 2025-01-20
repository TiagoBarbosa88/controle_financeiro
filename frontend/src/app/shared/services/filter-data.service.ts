import { inject, Injectable } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { environment } from 'src/environments/environment';
import { MenssageriaService } from './menssageria.service';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  private http = inject(HttpClient);
  private msg = inject(MenssageriaService);

  private transactionsApi = environment.transactionUrl;
  transactions: Transaction[] = []

  // evento de mudança de transações filtradas para a LISTA
  private monthYearChangeSource = new Subject<{ month: number, year: number }>();
  monthYearChange$ = this.monthYearChangeSource.asObservable();

  emitMonthYearChange(month: number, year: number): void {
    this.monthYearChangeSource.next({ month, year })
  }

  // evento de mudança de transações filtradas para o BALANCE
  private readonly filteredTransactionsSource = new BehaviorSubject<Transaction[]>([]);
  filteredTransactions$ = this.filteredTransactionsSource.asObservable();

  emitFilteredTransactions(filteredTransactions: Transaction[]): void {
  //  console.log("filteredTransactions " + filteredTransactions);
    this.filteredTransactionsSource.next(filteredTransactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsApi).pipe(
      catchError(error => {
        this.msg.showMessage('Erro ao buscar transações', error);
        return throwError(() => error)
      })
    );
  }

  filterTransactions(transactions: Transaction[], month: number, year: number): Transaction[] {
    const filtered: Transaction[] = transactions.filter(transaction => {
      const transactionDate = moment(transaction.date);

      return transactionDate.month() === month && transactionDate.year() === year;
    });
   console.log('Transações filtradas pelo Service:', filtered);
    return filtered;
  }


  calculateTotals(transactions: Transaction[], month: number, year: number): { receita: number, despesa: number, saldo: number } {
    // console.log('Transactions recebidas:', transactions);
    // console.log(`Filtrando para o mês: ${month}, ano: ${year}`);

    if (!transactions || transactions.length === 0) {
      return { receita: 0, despesa: 0, saldo: 0 };
    }

    const filteredTransactions = this.filterTransactions(transactions, month, year);
    // console.log('Transações filtradas:', filteredTransactions);

    if (filteredTransactions.length === 0) {
      return { receita: 0, despesa: 0, saldo: 0 };
    }

    const receita = filteredTransactions.filter(t => t.type === 'receita').reduce((acc, t) => acc + t.value, 0);
    const despesa = filteredTransactions.filter(t => t.type === 'despesa').reduce((acc, t) => acc + t.value, 0);
    const saldo = receita - despesa;

    // console.log(`Filtro ${JSON.stringify(filteredTransactions)}`);
    // console.log(`Valor de receita do mês ${month}: ${receita}`);
    // console.log(`Valor de despesa do mês ${month}: ${despesa}`);
    // console.log(`Valor de saldo do mês ${month}: ${saldo}`);
    return { receita, despesa, saldo };
  }



}

