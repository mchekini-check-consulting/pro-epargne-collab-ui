import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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

    getUserAccounts() {
        return this._httpClient.get<{ data: Account[] }>(this.url);
    }

    updateUserAccountsInvestementDetails(data: InvestementUploadPayload) {
        return this._httpClient.put(this.url, data);
    }
}
