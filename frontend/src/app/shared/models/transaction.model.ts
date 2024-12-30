export interface Transaction {
  id?: number;
  description: string;
  value: number;
  type: 'receita' | 'despesa'; // 'receita' para entrada, 'despesa' para saída
  category: string;
  date: string;
  styleClass?: string;
}