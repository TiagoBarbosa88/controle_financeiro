import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { FilterDataService } from 'src/app/shared/services/filter-data.service';
import { OperationsService } from 'src/app/shared/services/operations.service';

@Component({
  selector: 'app-transaction-balance',
  templateUrl: './transaction-balance.component.html',
  styleUrls: ['./transaction-balance.component.css']
})
export class TransactionBalanceComponent implements OnInit {
  
  entrada: number = 0;
  saida: number = 0;
  saldo: number = 0;

  constructor(
    private operationsService: OperationsService,
    private filterDateService: FilterDataService
  ) { }

  ngOnInit(): void {
    // se inscreve no observavel de OperationService para pegar os valores da transações
    this.operationsService.totalReceitas$.subscribe(value => this.entrada = value);
    this.operationsService.totalDespesas$.subscribe(value => this.saida = value);
    this.operationsService.totalBalance$.subscribe(value => this.saldo = value);
    this.operationsService.refreshTotals();

    // se inscreve no observavel do filterDataService para pegar as transações filtradas
    this.filterDateService.filteredTransactions$.subscribe( transactions => {
      if(transactions.length === 0) {        
      } else {
        const totals = this.filterDateService.calculateTotals(transactions);
        this.entrada = totals.entrada;
        this.saida = totals.saida;
        this.saldo = totals.saldo;
      }
    })

    // calcular os totais iniciais
    this.operationsService.calculateTotal();
  } 

  getBalanceClass(): string {
    if (this.saldo > 0) {
      return 'saldo'; // Classe para saldo positivo
    } else if (this.saldo < 0) {
      return 'despesa'; // Classe para saldo negativo
    } else {
      return 'neutro'; // Classe para saldo neutro (zero)
    }
  }
  
  getIconClass(): string {
    if (this.saldo > 0) {
      return 'icon-saldo'; // Classe para ícone de saldo positivo
    } else if (this.saldo < 0) {
      return 'icon-negative'; // Classe para ícone de saldo negativo
    } else {
      return 'icon-neutral'; // Classe para ícone de saldo neutro
    }
  }
  
}
