import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Category } from 'src/app/shared/models/category.model';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { OperationsService } from 'src/app/shared/services/operations.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  transactions: Transaction[] = [];
  categories: Category[] = [];
  isWeb: boolean = true;
  dataSource = new MatTableDataSource<Transaction>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['title', 'value', 'type', 'category', 'date', 'actions'];

  constructor(
    private transactionService: TransactionService,
    private categoriesService: CategoriesService,
    private operationsService: OperationsService,
    private breakpointObserver: BreakpointObserver,
    
  ) { }

  ngOnInit(): void {
    this.getTransactions();
    this.getCategories();

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
          this.isWeb = !result.matches;
        })
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private getTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.dataSource.data = transactions;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Método para pegar o nome da categoria com base no categoryId
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.category_name : 'Desconhecido';
  }

  public deleteTransaction(id: number) {   
    this.transactionService.deleteTransaction(id.toString()).subscribe(() => {   
      this.transactionService.showMessage('Item removido com sucesso !')  
      this.getTransactions()  
      this.operationsService.refreshTotals();
    })      
  }
}