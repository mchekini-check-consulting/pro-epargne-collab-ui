
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Account } from 'app/core/model/account';
import { AccountService } from 'app/core/service/account.service';
import { Subject, takeUntil } from 'rxjs';
import { TransactionDialogComponent } from '../component/tranaction-dialog/transaction-dialog.component';
import { RequestWithdrawalDialogComponent } from "../component/request-withdrawal-dialog/request-withdrawal-dialog";




@Component({
    selector: 'app-financial-operation',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './financial-operation.component.html',
    styleUrl: './financial-operation.component.css',
})
export class FinancialOperationComponent implements OnInit, OnDestroy {
    accounts: Account[] = [];
    totalAmount: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private accountService: AccountService
    ) {}

    openTransactionDialog() {
        this.dialog.open(TransactionDialogComponent, {
            width: '600px',
            height: '600px',
        });
    }
    openRequestWithdrawalDialog() {
        this.dialog.open(RequestWithdrawalDialogComponent, {
            width: '700px',
            height: '600px'
        });
    }

    navigateToHistory(): void {
        this.router.navigate(['/features/history']);
    }

    ngOnInit() {
        this.accountService.getUserAccounts().subscribe();
        this.accountService.accounts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((accounts) => {
                this.accounts = accounts;
                this.totalAmount = this.accounts.reduce(
                    (accumulator, currentValue) => {
                        return accumulator + currentValue.amount;
                    },
                    0
                );
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
