import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsHistoryComponent } from './assets-history.component';

describe('AssetsHistoryComponent', () => {
  let component: AssetsHistoryComponent;
  let fixture: ComponentFixture<AssetsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
