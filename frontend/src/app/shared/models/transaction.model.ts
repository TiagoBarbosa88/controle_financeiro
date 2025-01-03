export interface Transaction {
  id?: number;
  title: string;
  value: number;
  type: 'receita' | 'despesa'; 
  categoryId: number;
  category_name: string;
  date: string;
  styleClass?: string;
}