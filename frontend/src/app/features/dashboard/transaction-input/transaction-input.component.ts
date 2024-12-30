import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './transaction-input.component.html',
  styleUrls: ['./transaction-input.component.css']
})
export class TransactionInputComponent implements OnInit {
  selectedDate: Date = new Date();
  description: string = '';
  value: number | null = null;
  type: 'receita' | 'despesa' = 'receita';
  category: string = 'salario';
  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    // Carregar as categorias quando o componente for inicializado
    this.transactionService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Função para obter o categoryId a partir do nome da categoria
  getCategoryId(categoryName: string): number | undefined {
    const category = this.categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    return category ? category.id : undefined;
  }

  // Método chamado no envio do formulário
  onSubmit(): void {
    if (this.description && this.value !== null) {
      // Pegando o nome da categoria (e não o categoryId)
      const categoryName = this.category;

      // Criando um novo objeto de transação com os dados corretos
      const newTransaction: Transaction = {
        date: this.selectedDate.toISOString().split('T')[0],  // Convertendo a data para o formato adequado
        description: this.description,
        value: this.value,
        type: this.type === 'receita' ? 'receita' : 'despesa',
        category: categoryName,
        styleClass: this.type === 'receita' ? 'receita' : 'despesa' // Define a classe
      };

      // Enviando a transação para o serviço
      this.transactionService.createTransaction(newTransaction).subscribe(() => {
        this.transactionService.showMessage('Transação criada com sucesso !');
        location.reload();
      });
    } else {
      this.transactionService.showMessage('Por favor, preencha todos os campos corretamente');
    }
  }

}
