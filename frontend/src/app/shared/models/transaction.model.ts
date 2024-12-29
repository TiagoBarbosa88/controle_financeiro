export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense'; // 'income' para entrada, 'expense' para saída
  category: string;
  date: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}