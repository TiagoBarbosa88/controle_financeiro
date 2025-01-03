import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  transactionForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private categoryService: CategoriesService
  ) {
    this.transactionForm = this.fb.group({
      selectedDate: [new Date(), Validators.required],
      title: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0.01)]],
      type: ['receita', Validators.required],
      category: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    // Carregar as categorias quando o componente for inicializado
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  // Método chamado no envio do formulário
  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValues = this.transactionForm.value;

      // Encontrar o nome da categoria com base no ID selecionado
      const selectedCategory = this.categories.find(cat => cat.id === formValues.category);

      if (!selectedCategory) {
        this.transactionService.showMessage('Categoria inválida');
        return;
      }

      // Criar a nova transação com os campos necessários
      const newTransaction: Transaction = {
        date: formValues.selectedDate.toISOString().split('T')[0], // Formato de data ISO
        title: formValues.title,
        value: formValues.value,
        type: formValues.type,
        categoryId: selectedCategory.id,
        category_name: selectedCategory.category_name,
        styleClass: formValues.type === 'receita' ? 'receita' : 'despesa'
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
