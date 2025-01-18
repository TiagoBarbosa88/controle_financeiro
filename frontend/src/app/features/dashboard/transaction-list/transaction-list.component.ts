import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Category } from 'src/app/shared/models/category.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FilterDataService } from 'src/app/shared/services/filter-data.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() filteredTransactions: Transaction[] = [];

  transactions: Transaction[] = [];
  categories: Category[] = [];
  isWeb: boolean = true;
  dataSource = new MatTableDataSource<Transaction>();
  selectedMonth!: number;
  selectedYear!: number;

  displayedColumns: string[] = ['title', 'value', 'type', 'category', 'date', 'actions'];

  constructor(
    private transactionService: TransactionService,
    private categoriesService: CategoriesService,
    private breakpointObserver: BreakpointObserver,
    private filterDataService: FilterDataService
  ) { }

  ngOnInit(): void {
    // Defina o mês e ano iniciais com base na data atual
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth(); // Mês atual (0-11)
    this.selectedYear = currentDate.getFullYear(); // Ano atual
    
    this.getTransactions();
    this.getCategories();

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isWeb = !result.matches;
    });

    // Assina o observable para atualizar as transações filtradas
    this.filterDataService.filteredTransactions$.subscribe(filteredTransactions => {
      if (filteredTransactions) {
        this.updateDataSource(filteredTransactions);
      }
    });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private getTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions.map(transaction => ({
        ...transaction,
        category_name: this.getCategoryName(transaction.categoryId) // Adiciona o nome da categoria
      }));

     

      // Aplica o filtro inicial com base no mês e ano atual
      this.filterTransaction();
      // this.updateDataSource(this.transactions);
    });

    this.filterDataService.monthYearChange$.subscribe(({ month, year }) => {
      this.selectedMonth = month;
      this.selectedYear = year;
      this.filterTransaction();
    })
  }

  private updateDataSource(data: Transaction[]) {
    this.filteredTransactions = data;
    this.dataSource.data = data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCategoryName(categoryId: number | string): string {
    const category = this.categories.find(cat => `${cat.id}` === `${categoryId}`);
    return category ? category.category_name : 'Desconhecido';
  }

  public deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id.toString()).subscribe(() => {
      this.transactionService.showMessage('Item removido com sucesso!');
      const updatedTransactions = this.transactions.filter(transaction => transaction.id !== id);
      this.updateDataSource(updatedTransactions);
    });
  }

  filterTransaction(): void {
    if (this.selectedMonth !== undefined && this.selectedYear !== undefined) {
      this.filteredTransactions = this.filterDataService.filterTransactions(this.transactions, this.selectedMonth, this.selectedYear);
    } else {
      this.filteredTransactions = this.transactions
    }
    this.dataSource.data = this.filteredTransactions;
  }



}
