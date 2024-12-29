import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/shared/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {

  displayedColumns: string[] = ['id', 'description', 'value', 'category', 'date', 'actions'];

  dataSource = new MatTableDataSource<Transaction>([
    {
      id: 1,
      description: "Salário",
      value: 5000,
      type: "income",
      category: "Trabalho",
      date: "2024-12-01"
    },
    {
      id: 2,
      description: "Aluguel",
      value: -1500,
      type: "expense",
      category: "Moradia",
      date: "2024-12-05"
    }
  ]);

}  
