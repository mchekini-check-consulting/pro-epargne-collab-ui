import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {RequestWithdrawalModel} from "../model/request-withdrawal-model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RequestWithdrawalService {

    url: string = 'api/v1/requestWithdrawal';

    constructor(private http: HttpClient) {}

    // sendRequestWithdrawal(requestWithdrawalModel: any): void {
    //     this.http.post<RequestWithdrawalModel>(this.url, requestWithdrawalModel).subscribe(res => {
    //         console.log(res);
    //     });
    // }

    sendRequestWithdrawal( requestWithdrawalModel, filePee?,filePereco?):void{
        const requestWithdrawalDTO = new FormData();
        const bodyFile = new File([JSON.stringify(requestWithdrawalModel)], 'body.json', {
            type: 'application/json',
        });
        requestWithdrawalDTO.append('body', bodyFile);

        if (filePee) {
            requestWithdrawalDTO.append('filePee', filePee);
        }
        if (filePereco) {
            requestWithdrawalDTO.append('filePereco', filePereco);
        }
        console.log(requestWithdrawalDTO)
        this.http.post<any>(this.url, requestWithdrawalDTO).subscribe(res => {
                    console.log(res);
                 });;
    }

}
