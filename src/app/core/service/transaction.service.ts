import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from 'app/core/service/account.service';
import { TransactionModel } from '../model/transaction.model';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    url: string = 'api/v1/transaction';

    constructor(
        private http: HttpClient,
        private accountService: AccountService
    ) {}

    sendTransaction(transactionModel: TransactionModel): void {
        /**/
        this.http
            .post<TransactionModel>(this.url, transactionModel)
            .subscribe(() => {
                this.accountService.getUserAccounts().subscribe();
            });
    }
}
