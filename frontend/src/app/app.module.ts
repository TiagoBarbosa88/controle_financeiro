import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './features/components/header/header.component';
import { FooterComponent } from './features/components/footer/footer.component';
import { TransactionInputComponent } from './features/dashboard/transaction-input/transaction-input.component';
import { TransactionBalanceComponent } from './features/dashboard/transaction-balance/transaction-balance.component';
import { TransactionListComponent } from './features/dashboard/transaction-list/transaction-list.component';
import { HomeComponent } from './features/components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

// Define os formatos de data personalizados
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'yyyy-MM-dd',  // Formato para parsing
  },
  display: {
    dateInput: 'dd/MM/yyyy',  // Formato exibido
    monthYearLabel: 'MMM yyyy',   // Exemplo: Jan 2022
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    TransactionInputComponent,
    TransactionBalanceComponent,
    TransactionListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
