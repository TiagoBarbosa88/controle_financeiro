import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: Category[] = [];
  private categoryApi = 'http://localhost:3001/categories';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  getCategoryId(categoryName: string): number {
    const category = this.categories.find(cat => cat.category_name === categoryName);
    return category ? category.id : 0;
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryApi)
  }


}
