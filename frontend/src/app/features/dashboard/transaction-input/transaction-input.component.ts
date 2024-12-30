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
  selectedDate: Date = new Date(); // Data atual como valor inicial
  description: string = ''; // Inicializando a descrição como uma string vazia
  value: number | null = null; // Inicializando o valor como null
  type: 'income' | 'expense' = 'income'; // Valor padrão para tipo de transação
  category: string = 'salario'; // Valor padrão para categoria

  categories: Category[] = []; // Lista de categorias

  constructor(
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Carregar as categorias quando o componente for inicializado
    this.transactionService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
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
        id: 0,  // O ID será gerado automaticamente pelo backend, ou deixe como 0 se o backend fizer isso
        date: this.selectedDate.toISOString().split('T')[0],  // Convertendo a data para o formato adequado
        description: this.description,
        value: this.value,
        type: this.type === 'income' ? 'income' : 'expense',
        category: categoryName,  // Usando category (nome da categoria)
      };
  
      // Enviando a transação para o serviço
      this.transactionService.createTransaction(newTransaction).subscribe(
        (response) => {
          console.log('Transação criada com sucesso', response);
        },
        (error) => {
          console.error('Erro ao criar transação', error);
        }
      );
    } else {
      console.error('Por favor, preencha todos os campos corretamente');
    }
  }
  
}
