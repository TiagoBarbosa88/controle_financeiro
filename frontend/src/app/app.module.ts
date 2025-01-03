import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './features/components/header/header.component';
import { FooterComponent } from './features/components/footer/footer.component';
import { TransactionBalanceComponent } from './features/dashboard/transaction-balance/transaction-balance.component';
import { HomeComponent } from './features/components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TransactionService } from './shared/services/transaction.service';
import { TransactionInputComponent } from './features/dashboard/transaction-input/transaction-input.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TransactionListComponent } from './features/dashboard/transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    TransactionBalanceComponent,
    HomeComponent,
    TransactionInputComponent,
    TransactionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
