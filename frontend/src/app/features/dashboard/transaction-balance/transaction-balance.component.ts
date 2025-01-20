import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { FilterDataService } from 'src/app/shared/services/filter-data.service';

@Component({
  selector: 'app-transaction-balance',
  templateUrl: './transaction-balance.component.html',
  styleUrls: ['./transaction-balance.component.css']
})
export class TransactionBalanceComponent implements OnInit {
  receita: number = 0;
  despesa: number = 0;
  saldo: number = 0;

  selectedMonth: number = moment().month() + 1 ;
  selectedYear: number = moment().year();

  filteredTransactions: Transaction[] = []; // Lista de transações filtradas

  constructor(
    private filterDateService: FilterDataService,
  ) { }

  ngOnInit(): void {
    this.filterDateService.monthYearChange$.subscribe((monthYear) => {
      this.selectedMonth = monthYear.month;
      this.selectedYear = monthYear.year;
      this.initializeTransactions(); // Atualiza as transações sempre que o mês/ano mudar
    });

    this.initializeTransactions(); // Inicializa as transações ao carregar o componente
  } 

  /**
     * Inicializa as transações e atualiza os totais
  **/
  private currentMonth: number | null = null;
  private currentYear: number | null = null;
  
  initializeTransactions(): void {
    // Verifica se o mês/ano mudou para evitar requisições desnecessárias
    if (this.selectedMonth !== this.currentMonth || this.selectedYear !== this.currentYear) {
      this.currentMonth = this.selectedMonth;
      this.currentYear = this.selectedYear;


      this.filterDateService.getTransactions().subscribe({
        next: (transactions: Transaction[]) => {
          this.filteredTransactions = this.filterTransactions(transactions);
          this.updateTotals();
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        },
      });
    } else {
    }
  }
  

 
  private filterTransactions(transactions: Transaction[]): Transaction[] {
    return this.filterDateService.filterTransactions(transactions, this.selectedMonth, this.selectedYear);
  }

  /**
   * Atualiza os totais (receita, despesa, saldo) com base nas transações filtradas
   **/
  private updateTotals(): void {
    const { receita, despesa, saldo } = this.filterDateService.calculateTotals(
      this.filteredTransactions,
      this.selectedMonth,
      this.selectedYear
    );
    this.receita = receita;
    this.despesa = despesa;
    this.saldo = saldo;
  }

  // Função para atualizar mês e ano selecionados
  onMonthYearChange(month: number, year: number): void {
    this.selectedMonth = month;
    this.selectedYear = year;
    this.filterDateService.emitMonthYearChange(month, year);
  }

/**
   * Determina a classe CSS com base no saldo
   */ 
   getBalanceClass(): string {
    if (this.saldo > 0) return 'saldo'; // Saldo positivo
    if (this.saldo < 0) return 'despesa'; // Saldo negativo
    return 'neutro'; // Saldo neutro
  }

  /**
   * Determina a classe do ícone com base no saldo
  */
  getIconClass(): string {
    if (this.saldo > 0) return 'icon-saldo'; // Ícone positivo
    if (this.saldo < 0) return 'icon-negative'; // Ícone negativo
    return 'icon-neutral'; // Ícone neutro
  }
}
