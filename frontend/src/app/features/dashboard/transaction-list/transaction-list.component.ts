import { Component, OnInit } from '@angular/core';
import { Category, Transaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['description', 'value', 'category', 'type', 'date', 'actions'];
  transactions!: Transaction[]
  categories!: Category[]

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    })

    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  // Método para pegar o nome da categoria com base no categoryId
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconhecido';
  }

}  
