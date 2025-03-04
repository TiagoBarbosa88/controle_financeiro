import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction.model';
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

  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.operationsService.totalReceitas$.subscribe(value => this.entrada = value);
    this.operationsService.totalDespesas$.subscribe(value => this.saida = value);
    this.operationsService.totalBalance$.subscribe(value => this.saldo = value);
    this.operationsService.refreshTotals();
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
