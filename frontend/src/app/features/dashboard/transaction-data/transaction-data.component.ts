import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionInputComponent } from '../transaction-input/transaction-input.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FilterDataService } from 'src/app/shared/services/filter-data.service';

@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.css']
})
export class TransactionDataComponent implements OnInit {
  selectedMonth!: number;
  selectedYear!: number;

  transactions: Transaction[] = []; // Lista original de transações
  filteredTransactions: Transaction[] = []; // Lista filtrada
  isWeb = true; // Responsividade (desktop ou mobile)

  constructor(
    private dialog: MatDialog,
    private transactionService: TransactionService,
    private filterDataService: FilterDataService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.getTransactions();
    this.observeBreakpoint(); // Observa mudanças na responsividade

    // Inscreve-se nas mudanças de mês e ano
  this.filterDataService.monthYearChange$.subscribe(({ month, year }) => {
    this.filteredTransactions = this.filterDataService.filterTransactions(this.transactions, month, year);
    console.log('Transações filtradas:', this.filteredTransactions);
  });
  }

  private observeBreakpoint() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isWeb = !result.matches;
    });
  }

  private getTransactions() {
    // Obtém as transações do serviço
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = [...transactions]; // Inicializa com todas as transações
    });
  }

  // Método para abrir o diálogo de entrada de transação
  openDialog() {
    const dialogRef = this.dialog.open(TransactionInputComponent);

    dialogRef.afterClosed().subscribe(result => {     
        console.log(`Dialog result ${result}`)     
    });
  }

  onMonthChange(event: any): void {
    const date = moment(event.value);
    this.selectedMonth = date.month();
    this.selectedYear = date.year();
    console.log(`Mês selecionado: ${this.selectedMonth}, Ano selecionado: ${this.selectedYear}`);
    this.filterDataService.emitMonthYearChange(this.selectedMonth, this.selectedYear);
  }
  
  chosenMonthHandler(normalizedMonth: moment.Moment, datapicker: any): void {
    const ctrValue = moment();
    ctrValue.month(normalizedMonth.month()).year(normalizedMonth.year());
    this.onMonthChange({ value: ctrValue });
    datapicker.close();
  }
}

