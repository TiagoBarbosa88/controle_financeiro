import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TransactionEditComponent } from './features/dashboard/transaction-edit/transaction-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'transaction/edit/:id', component: TransactionEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
