import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsHistoryTableComponent } from './assets-history-table.component';

describe('AssetsHistoryTableComponent', () => {
  let component: AssetsHistoryTableComponent;
  let fixture: ComponentFixture<AssetsHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsHistoryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
