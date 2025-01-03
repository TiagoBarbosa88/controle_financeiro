import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInput2Component } from './transaction-input2.component';

describe('TransactionInput2Component', () => {
  let component: TransactionInput2Component;
  let fixture: ComponentFixture<TransactionInput2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionInput2Component]
    });
    fixture = TestBed.createComponent(TransactionInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
