import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialOperationComponent } from './financial-operation.component';

describe('FinancialOperationComponent', () => {
  let component: FinancialOperationComponent;
  let fixture: ComponentFixture<FinancialOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialOperationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
