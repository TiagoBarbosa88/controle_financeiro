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

  selectedMonth: number = moment().month() + 1
  selectedYear: number = moment().year();

  filteredTransactions: Transaction[] = []; // Lista de transações filtradas

  constructor(
    private filterDateService: FilterDataService,
  ) { }

  ngOnInit(): void {
    // this.selectedMonth = 0; 
    // this.selectedYear = 2025;
    console.log(`Emitindo filtro inicial para: ${this.selectedMonth}/${this.selectedYear}`);

    // Inicializa as transações e atualiza os totais
    this.initializeTransactions();

    // Define o mês e ano iniciais com base na data atual
    // const currentDate = new Date();
    // this.selectedMonth = currentDate.getMonth() + 1; // Mês atual (0-11)
    // this.selectedYear = currentDate.getFullYear(); // Ano atual
    // console.log(`Emitindo filtro inicial para: ${this.selectedMonth}/${this.selectedYear}`);

    // Assina o Observable para monitorar as mudanças nas transações filtradas
    // this.filterDateService.filteredTransactions$.subscribe(filteredTransactions => {

    // pega os valor iniciais filtrados
    // this.filterDateService.filteredTransactions$.subscribe(transactions => {
    // })

    // console.log('Transações filtradas recebidas:', filteredTransactions);
    // console.log(`Emitindo filtro inicial para: ${this.selectedMonth}/${this.selectedYear}`);
    // Emitir o mês e ano inicial para filtrar as transações automaticamente
    //   this.filterDateService.emitMonthYearChange(this.selectedMonth, this.selectedYear);
    //   this.updateTotals(filteredTransactions);
    // });
  }

  /**
     * Inicializa as transações e atualiza os totais
     */
  private initializeTransactions(): void {
    this.filterDateService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.filteredTransactions = this.filterTransactions(transactions, this.selectedMonth, this.selectedYear);
        // console.log(`filtradas ts:`, this.filteredTransactions);
        this.updateTotals();
      },
      error: (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    });
  }

  /**
     * Filtra as transações com base no mês e ano selecionados
     * @param transactions Lista de transações
     * @param month Mês selecionado
     * @param year Ano selecionado
     * @returns Lista de transações filtradas
     */
  // private filterTransactions(transactions: Transaction[], month: number, year: number): Transaction[] {
  //   return transactions.filter((transaction) => {
  //     const transactionDate = new Date(transaction.date);
  //     const transactionMonth = transactionDate.getMonth() + 1; 
  //     const transactionYear = transactionDate.getFullYear();


  //     return transactionMonth === month && transactionYear === year;
  //   });
  // }

  private filterTransactions(transactions: Transaction[], month: number, year: number): Transaction[] {
    const filtered: Transaction[] = transactions.filter(transaction => {
      const transactionDate = moment(transaction.date); // Usando moment.js para parse da data
      const transactionMonth = transactionDate.month(); // Mes no formato 0-11 (sem necessidade de ajuste)
      console.log('Mês passado:', month)

      console.log('Data da transação:', transactionDate.format('YYYY-MM-DD'));
      console.log('Mês transação:', transactionMonth, 'Mês passado:', month);
      
      const transactionYear = transactionDate.year(); // Ano
      console.log('Ano transação:', transactionYear, 'Ano passado:', year);
      
      // Comparando mês e ano, semelhante ao filtro com moment.js
      return transactionMonth === month && transactionYear === year;
    });

    console.log('Transações filtradas pelo ts:', filtered); // Exibe as transações filtradas
    return filtered;
  }

  /**
   * Atualiza os totais (receita, despesa, saldo) com base nas transações filtradas
   * @param transactions Lista de transações filtradas
   */
  private updateTotals(): void {
    this.receita = this.calculateTotal('receita');
    this.despesa = this.calculateTotal('despesa');
    this.saldo = this.receita - this.despesa;

    console.log('Receita:', this.receita, 'Despesa:', this.despesa, 'Saldo:', this.saldo);
  }

  private calculateTotal(type: string): number {
    return this.filteredTransactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.value, 0);
  }
  // updateTotals() {
  //   this.receita = this.filteredTransactions
  //     .filter(t => t.type === 'receita')
  //     .reduce((sum, t) => sum + t.value, 0);

  //   this.despesa = this.filteredTransactions
  //     .filter(t => t.type === 'despesa')
  //     .reduce((sum, t) => sum + t.value, 0);

  //   this.saldo = this.receita - this.despesa;

  //   console.log('Receita:', this.receita);
  //   console.log('Despesa:', this.despesa);
  //   console.log('Saldo:', this.saldo);
  // }





  // private updateTotals(transactions: Transaction[]): void {
  //   if (!transactions || transactions.length === 0) {
  //     console.warn('As transações estão vazias no método updateTotals.');
  //     return;
  //   }

  //   const totals = this.filterDateService.calculateTotals(transactions, this.selectedMonth, this.selectedYear);

  //   this.receita = totals.receita;
  //   this.despesa = totals.despesa;
  //   this.saldo = totals.saldo;

  //   console.log(`UpdateTotal`);
  //   console.log(`Receita: ${this.receita}`);
  //   console.log(`Despesa: ${this.despesa}`);
  //   console.log(`Saldo: ${this.saldo}`);
  // }


  // Função para atualizar mês e ano selecionados
  onMonthYearChange(month: number, year: number): void {
    // console.log(`Mês e ano alterados para: ${month}/${year}`);
    this.selectedMonth = month;
    this.selectedYear = year;

    // Emitir evento para filtrar transações conforme o mês e ano selecionados
    this.filterDateService.emitMonthYearChange(month, year);

    // this.initializeTransactions();
  }

/**
   * Determina a classe CSS com base no saldo
   * @returns Classe CSS para o saldo
   */  getBalanceClass(): string {
    if (this.saldo > 0) return 'saldo'; // Saldo positivo
    if (this.saldo < 0) return 'despesa'; // Saldo negativo
    return 'neutro'; // Saldo neutro
  }

  /**
   * Determina a classe do ícone com base no saldo
   * @returns Classe CSS para o ícone
   */
  getIconClass(): string {
    if (this.saldo > 0) return 'icon-saldo'; // Ícone positivo
    if (this.saldo < 0) return 'icon-negative'; // Ícone negativo
    return 'icon-neutral'; // Ícone neutro
  }
}
