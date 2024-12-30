import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-balance',
  templateUrl: './transaction-balance.component.html',
  styleUrls: ['./transaction-balance.component.css']
})
export class TransactionBalanceComponent {
  @Input() entrada: number = 6000;
  @Input() saida: number = 5000;

  getBalance(): number {
    return this.entrada - this.saida;
  }

  getBalanceClass(): string {
    return this.getBalance() >= 0 ? 'receita' : 'despesa';
  }
}
