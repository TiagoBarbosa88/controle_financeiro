import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './transaction-input.component.html',
  styleUrls: ['./transaction-input.component.css']
})
export class TransactionInputComponent implements OnInit {
  selectedDate: Date = new Date();
  title: string = '';
  value: number | null = null;
  type: 'receita' | 'despesa' = 'receita';
  category: number | null = null; 
  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    // Carregar as categorias quando o componente for inicializado
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Função para obter o categoryId a partir do nome da categoria
  getCategoryId(categoryName: string): number | undefined {
    const category = this.categories.find(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase());
    return category ? category.id : undefined;
  }

  // Método chamado no envio do formulário
  onSubmit(): void {
    if (this.title && this.value !== null && this.category !== null) {
      // Encontrar o nome da categoria com base no ID selecionado
      const selectedCategory = this.categories.find(cat => cat.id === this.category);

      if (!selectedCategory) {
        this.transactionService.showMessage('Categoria inválida');
        return;
      }

      // Criar a nova transação com os campos necessários
      const newTransaction: Transaction = {
        date: this.selectedDate.toISOString().split('T')[0], // Formato de data ISO
        title: this.title,
        value: this.value,
        type: this.type,
        categoryId: selectedCategory.id,
        category_name: selectedCategory.category_name,
        styleClass: this.type === 'receita' ? 'receita' : 'despesa'
      };

      // Enviar a transação para o serviço
      this.transactionService.createTransaction(newTransaction).subscribe(() => {
        this.transactionService.showMessage('Transação criada com sucesso!');
        location.reload();
      });
    } else {
      this.transactionService.showMessage('Por favor, preencha todos os campos corretamente.');
    }
  }
}