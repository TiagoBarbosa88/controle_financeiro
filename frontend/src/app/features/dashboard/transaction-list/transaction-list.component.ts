import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/shared/transaction.model';
import { TransactionService } from 'src/app/shared/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'value', 'category', 'date', 'actions'];
  transactions!: Transaction[]
  
  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe( transactions => {
      this.transactions = transactions;
      console.log(transactions);      
    })
  }

}  
