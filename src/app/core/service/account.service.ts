import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Account } from '../model/account';

type InvestementUploadPayload = {
    peeRiskLevel: string;
    peeManagementMode: string;
    perecoManagementMode: string;
    perecoRiskLevel: string;
};

@Injectable({ providedIn: 'root' })
export class AccountService {
    url: string = 'api/v1/account';
    private _httpClient = inject(HttpClient);

    public _accounts: ReplaySubject<Account[]> = new ReplaySubject<Account[]>(
        1
    );

    get accounts$(): Observable<Account[]> {
        return this._accounts.asObservable();
    }

    getUserAccounts() {
        return this._httpClient.get<{ data: Account[] }>(this.url).pipe(
            tap((res: { data: Account[] }) => {
                this._accounts.next(res?.data || []);
            })
        );
    }

    updateUserAccountsInvestementDetails(data: InvestementUploadPayload) {
        return this._httpClient.put(this.url, data).pipe(
            tap(() => {
                this.getUserAccounts().subscribe();
            })
        );
    }
}
