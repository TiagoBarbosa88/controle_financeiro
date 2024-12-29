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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
